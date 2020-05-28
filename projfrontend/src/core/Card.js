import React, { useState, useEffect } from 'react';
import ImageHelper from './helper/ImageHelper';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import { isAuthenticated } from "../auth/helper";
import { Redirect } from 'react-router-dom';


	
	const Card = ({ product, addtoCart=true, removeFromCart= false, quantity=false, setReload = f => f, reload = undefined }) => {
		
		const [redirect, setRedirect] = useState(false); 
		const [count, setCount] = useState(product.count);
		
		const cardTitle = product ? product.name : "A photo from pexels"
		const cardDescription = product ? product.description : "Default Description"
		const cardPrice = product ? product.price : "DEFAULT"
		const cardQuantity = product ? product.quantity: "1"
		const cardSize = product ? product.size: "CS"
	
		const addToCart = () => {
			addItemToCart(product, () => setRedirect(true))
		}
		
		const getARedirect = (redirect) => {
			if(redirect){
				return <Redirect to="/cart" />
			}
		}
		
		const showAddToCart = (addtoCart) => {
			return isAuthenticated() ? (
			addtoCart &&( 
			<button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
			  )
			) : (
					<h6 className="text-white"> Please SignIn to add products to your cart</h6>
		)
		};
		
		const showRemoveFromCart = (removeFromCart) => {
			return(
			removeFromCart &&(
			<button
                onClick={() => {
					removeItemFromCart(product._id);
					setReload(!reload);	
				}}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
			  )
			 );
		};
		
		const showquantity = (quantity) => {	
			let quant = product.count;
			return(
			quantity &&(
			<p className="btn btn-success rounded  btn-sm px-4">Quantity: {quant}</p>
			  )
			 );
		};
		
    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
		{getARedirect(redirect)}
          <ImageHelper product={product} />
          <p className="lead bg-success font-weight-normal text-wrap">
		  {cardDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">
		  $ {cardPrice}
		  </p>
		  <p className="btn btn-success rounded  btn-sm px-4 ml-2 mr-2">
		   Size: {cardSize}
		  </p>
		  {showquantity(quantity)}
          <div className="row ">
            <div className="col-12">
			{showAddToCart(addtoCart)}
            </div>
            <div className="col-12">
			{showRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Card;