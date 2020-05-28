import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getAllOrders } from '../core/helper/orderHelper';

const ManageOrders = () => {
	
	const [orders, setOrders] = useState([])
	
	const {user, token} = isAuthenticated();
	
	const preload = () => {
		getAllOrders(user._id, token).then(data => {
			
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  

  useEffect(() => {
    preload();
  }, []);
	
	
	return (
		<Base title="Welcome admin" description="Manage Orders here">
      <h2 className="mb-4">All Orders:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
		  {
			  orders.map((order, index) => {
				  return (
					<div key={index} className="row text-center mb-2 ">
            <div className="col-3">
			<Link to={`/view/order/${order._id}`}>
              <h5 className="text-white text-left">{order._id}</h5>
			  </Link>
            </div>
			<div className="col-3">
              
			</div>
			<div className="col-3">
              <h3 className="text-white text-left">{order.status}</h3>
            </div>
            <div className="col-3">
              <Link
                className="btn btn-success"
                to={`/admin/order/update/${order._id}`}
              >
                <span className="">Update Status</span>
              </Link>
            </div>
            
			</div>
				  );
			  })
		  }
		   
          
        </div>
      </div>
    </Base>
	);
};

export default ManageOrders;