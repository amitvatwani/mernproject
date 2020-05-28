import React, { useState } from 'react';
import "../styles.css"
import Base from '../core/Base';

const ContactUs = () => {

	
	const[values, setValues] = useState({
		name: "",
		email: "",
		conatct: "",
		error: "",
		success: false
	});
	
	const{name, email, contact, error, success} = values
	
	
	const handleChange = name => event => {
		setValues({...values, error: false, [name]: event.target.value});
	};
	
	const onSubmit = () => (
		<h4> Details Submited Successfully. We will reach you within 24-48 hours</h4>
	);
	
	return (
	<Base title="ContactUs Page" description="Reach out to us "> 
		<div className="row text-center">
		
		<p>We love to hear from you on our customer service, merchandise, website or any topics you want to share with us. Your comments and suggestions are greatly appreciated! Please fill the form and let’s get talking</p>
		<div className="col-6">
				<form>
					<div className="form-group">
						<label className="text-light">Name</label>
						<input className="form-control" onChange={handleChange("name")} type="text" value={name} />
					</div>
					<div className="form-group">
						<label className="text-light">Email</label>
						<input className="form-control" onChange={handleChange("email")} type="email" value={email} />
					</div>
					<div className="form-group">
						<label className="text-light">Contact No.</label>
						<input className="form-control" onChange={handleChange("contact")} type="contact" value={contact} />
					</div>
					<button onClick={onSubmit} className="btn btn-success btn-block mb-20">Submit</button>
				</form>
		</div>
		<div className="col-6">
		<p className="mt-10">you can reach us via email at</p> <h6>support@iwritecode.com</h6>
		<p>You can also call us via</p> <h6>+91 8888888888</h6>
		<h6>Timings:</h6><p> Monday to Saturday - 10 am to 6 pm</p>

		<h6>Store Address:</h6> <p>9-3-685/1/11, Road Number 75, Banjara Hills, Punjab, Chandigarh 500035.</p>
		</div>
		</div>
	</Base>
	); 
};

export default ContactUs;
