const express = require('express');
const router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require('../controllers/category');
const {isSignedIn, isAdmin, isAuthenticated} = require('../controllers/auth');
const {getUserById} = require('../controllers/user');

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById); 

//actual routers goes here

//create routes
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

//read routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//update routes
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);

//delete routes
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);	


module.exports = router;