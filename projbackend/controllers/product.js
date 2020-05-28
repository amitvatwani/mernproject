const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
	.populate("category")
	.exec((err, product) =>{
		if(err){
			return res.status(400).json({
				error: "Product not found"
			});
		}
		req.product = product;
		next();
	});
};

//create product controller

exports.createProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields, file ) => {
		if(err) {
			res.status(400).json({
				error: "Image Upload Failed"
			});
		}
		//destructure the fields
		const {name, description, price, category, stock, size} = fields;
		
		if(
			!name ||
			!description ||
			!price ||
			!category ||
			!stock ||
			!size
		){
			return res.status(400).json({
				error: "Please include all the fields"
			});
		}			

		let product = new Product(fields);

		//handle file here
		if(file.photo){
			if(file.photo.size > 3000000){
				return res.status(400).json({
					error: "File size too big"
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		console.log(product);
		//save to the DB
		product.save((err, product) => {
			if(err)
			{
				return res.status(400).json({
					error: "Saving Tshirt in DB Failed "+err
				});
			}
			res.json(product);
		});
	});
};

//read product controller

exports.getProduct = (req, res) => {
	req.product.photo = undefined;
	return res.json(req.product);
};
//middleware
exports.photo = (req, res, next) => {
	if(req.product.photo.data)
	{
		res.set("Content-Type", req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
};

//delete product controller

exports.deleteProduct = (req, res) => {
	let product = req. product
	product.remove((err, deletedProduct) => {
		if(err){
			return res.status(400).json({
				error : "Failed to delete the product"
			});
		}
		res.json({
			message: "Deletetion was a success",
			deletedProduct
		});
	});
};

//update product controller

exports.updateProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	
	form.parse(req, (err, fields, file ) => {
		if(err) {
			res.status(400).json({
				error: "Image Upload Failed"
			});
		}
		//updation code
		let product = req.product;
		product = _.extend(product, fields)

		//handle file here
		if(file.photo){
			if(file.photo.size > 3000000){
				return res.status(400).json({
					error: "File size too big"
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		console.log(product);
		//save to the DB
		product.save((err, product) => {
			if(err)
			{
				return res.status(400).json({
					error: "Updation of product failed "+err
				});
			}
			res.json(product);
		});
	});
};

//products listing

exports.getAllProducts = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 100
	let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
	Product.find()
	.sort([[sortBy, "asc"]])
	.populate("category")
	.select("-photo")
	.limit(limit)
	.exec((err, products) => {
		if(err)
		{
			return res.status(400).json({
				error: "No Product Found"
			});
		}
		res.json(products);
	});
};

exports.getAllUniqueCategories = (req, res) => {
	Product.distinct("category", {}, (err, category) => {
		if(err){
			return res.status(400).json({
				error: "No Category Found"
			});
		}
		res.json(category);
			
	});
};


exports.updateStock = (req, res, next) => {
	
	let myOperations = req.body.order.products.map(prod => {
		return {
			updateOne: {
				filter: {_id: prod._id},
				update: {$inc: {stock: -prod.count, sold: +prod.count}}
			}
		};
	});
	
	Product.bulkWrite(myOperations, {}, (err, products) => {
		if(err){
			return res.status(400).json({
				error: "Bulk Operation Failed"
			});
		}
		next();
	});
};