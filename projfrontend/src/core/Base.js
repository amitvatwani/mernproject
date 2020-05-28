import React from 'react';
import Menu from './Menu';
import { API } from "../backend";
import { Link } from "react-router-dom";

 const Base = ({
	 title="My Title",
	 description="My Description",
	 className="bg-dark text-white p-1",
	 children 
 }) => (
	<div>		
		<Menu />
		<div className="container-fluid">
			<div className="jumbotron bg-dark text-white text-center p-1 mb-0">
				<h3 className="display-5 p-3 mb-0">{title}</h3>
				<p className="lead ">{description}</p>
			</div>
			<div className={className}>{children}</div>
		</div>
		<footer className="footer bg-dark mt-auto py-1">
			<div className="container-fluid bg-success text-white text-center py-1">
				<h6>If you got any questions, feel free to reach out!</h6>
				<Link to='contactus'>
				<button className="btn btn-warning btn-md onClick={conatctus}">Contact Us</button>
				</Link>
			</div>
			<div className="container">
				<span className="text-muted">An amazing <span className="text-white">MERN</span> bootcamp</span>
			</div>
		</footer>
			
	</div>
 
)

export default Base;