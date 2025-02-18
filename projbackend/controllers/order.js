const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) =>{
	Order.findById(id)
	.populate("products.product", "name price")
	.exec((err, order) => {
		if(err){
			return res.json(400).json({
				error: "No Order found in DB"
			});
		}
		req.order = order;
		next();
	});
};


exports.createOrder = (req, res) => {
	req.body.order.user = req.params.userId;
	const order = new Order(req.body.order)
	order.save((err, order) => {
		if(err){
			return res.status(400).json({
					error: "Failed to save your order in DB"
			});			
		}
		res.json(order);
	});
};

exports.getAllOrders = (req, res) => {
	Order.find()
		.populate("user","_id name")
		.exec((err, order) => {
			if(err){
				return res.status(400).json({
					error: "No Orders Found in DB"
				});
			}
			res.json(order);
		});
};

exports.getOrderStatus = (req, res) => {
	res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
	console.log(req.params);
	Order.update(
	{_id: req.params.orderId},
	{$set: {status: req.body.order.status}},
	(err, order) => {
		if(err){
			return res.status(400).json({
				error: "Cannot update Order Status"
			});
		}
		res.json(order);
	}
	);
};