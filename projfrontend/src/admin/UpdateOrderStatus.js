import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { updateOrderStatus, getAllOrders } from "../core/helper/orderHelper";
import { isAuthenticated } from "../auth/helper/index";

const UpdateOrderStatus = ({match}) => {
  const { user, token } = isAuthenticated();
  
  const [status, setStatus] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	
	
	const goBack = () => (
		<div className="mt-5">
			<Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
		</div>
	);
	
	const handleChange = event => {
		setError("");
		setStatus(event.target.value)
	};
	
	const onSubmit = (event) => {
		event.preventDefault();
		setError("");
		setSuccess(false);
		
		//backend request fired
		updateOrderStatus(match.params.orderid, user._id, token, {status} )
		.then(data => {
			if(data.error) {
				setError(true);
			}else {
				setError("");
				setSuccess(true);
				setStatus("");
			}
		})
	};
	

  const preload = (userId) => {
    getAllOrders(user._id, token).then(data => {
      //console.log(data);
      if (data.error) {
        setError(true);
      } else {
				preloadOderStatus();
				setError("");
				setSuccess(true);
				setStatus("");
			
		}
      }
    )
  };
  
  const preloadOderStatus = () => {
	  getAllOrders(user._id, token).then(data => {
		if(data.error) {
			setError(true);
		} else {
				setError("");
				setSuccess("");
				setStatus("");
			}
		}
	  );
  };

  useEffect(() => {
    preload(match.params.orderid);
  }, []);

  const successMessage = () => {
		if(success) {
			return <h6 className="text-success">Order Status updated Successfully</h6>;
		}
	};
	
	const warningMessage = () => {
		if(error) {
			return <h6 className="text-warning">Failed to Update Order Status</h6>;
		}
	}

  const updateStatusForm = () => (
    <form>
			<div className="form-group">
				<p className="lead">Enter the Status to Update</p>
				<input type="text" className="form-control my-3" onChange={handleChange} value={status} autoFocus required placeholder="For Ex. Shipped" />
				<button onClick={onSubmit} className="btn btn-outline-info">Update Status</button>
			</div>
		</form>
  );

  return (
    <Base
      title="Update status here!"
      description="Welcome to Order status Updation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
		  {warningMessage()}
          {updateStatusForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateOrderStatus;
