import React, {useState, useEffect} from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getProducts, deleteProduct } from './helper/adminapicall';

const ManageProducts = () => {
	
	const [products, setProducts] = useState([])
	
	const {user, token} = isAuthenticated();
	
	const preload = () => {
		getProducts().then(data => {
      //console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);
  
  const deleteThisProduct = productId => {
	 if(window.confirm("Are you sure you want to delete this category")){
	  deleteProduct(productId, user._id, token).then(data => {
		if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }  
	  })
	 }
  }
	
	return (
		<Base title="Welcome admin" description="Manage products here">
      <h6 className="mb-4">All products:</h6>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h6 className="text-center text-white my-3">Total 3 products</h6>

          {products.map((product, index) => {
			  return ( <div key={index} className="row text-center mb-2 ">
            <div className="col-4">
              <h6 className="text-white text-left">{product.name}</h6>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/${product._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {
				  deleteThisProduct(product._id);
			  }} className="btn btn-danger">
                Delete
              </button>
            </div>
			</div>
			);
		  })}
          
        </div>
      </div>
    </Base>
	);
};

export default ManageProducts;