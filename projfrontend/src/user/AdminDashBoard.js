import React from 'react';
import Base from '../core/Base';
import {isAuthenticated} from '../auth/helper/index';
import {Link} from 'react-router-dom';
 
const AdminDashBoard = () => {
	
	const{user: {name, email, role}} = isAuthenticated();
	
	const adminLeftSide = () => {
		return (
			<div className="card">
				<h6 className="card-header bg-dark text-white">Admin Navigation	</h6>
				<ul className="list-group ">
					<li className="list-group-item pb-1 pt-1">
						<Link className="nav-link text-success" to="/admin/create/category">Create Category</Link>
					</li>
					<li className="list-group-item pb-1 pt-1">
						<Link className="nav-link text-success" to="/admin/categories">Manage Category</Link>
					</li>
					<li className="list-group-item pb-1 pt-1">
						<Link className="nav-link text-success" to="/admin/create/product">Create Product</Link>
					</li>
					<li className="list-group-item pb-1 pt-1">
						<Link className="nav-link text-success" to="/admin/products">Manage Products</Link>
					</li>
					<li className="list-group-item pb-1 pt-1">
						<Link className="nav-link text-success" to="/admin/orders">Manage Orders</Link>
					</li>
				</ul>
			</div>
		);
	};
	
	const adminRightSide = () => {
		return (
			<div className="card mb-4">
				<h6 className="card-header">Admin Information</h6>
				<ul className="list-group">
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Name: </span> {name}
					</li>
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Email: </span> {email}
					</li>
					<li className="list-group-item">
						<span className="badge badge-danger">Admin Area </span>
					</li>
				</ul>
			</div>
		);
	};
	
	return (
			<Base title="Welcome to admin area" description="Manage all of your products here" className="container bg-success p-4 mb-4">
			<div className="row">
				<div className="col-3">
					{adminLeftSide()}
				</div>
				<div className="col-9">
					{adminRightSide()}
				</div>
			</div>
			</Base>
	);
 };
 
 export default AdminDashBoard;