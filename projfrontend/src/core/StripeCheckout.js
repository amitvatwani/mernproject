import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price * p.count;
    });
    return amount;
  };

  const makePayment = token => {
    const body = {
      token,
      products
    };
    const headers = {
      "Content-Type": "application/json"
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log(response);
        //call further methods
      })
      .catch(error => console.log(error));
  };
  
  /*const onPurchase = () => {
	  const orderData = {
			  products: products, 
			 // transaction_id: response.transaction_id,
			  //amount:
		  }
		  createOrder(userId, token, orderData);
		  
			cartEmpty(() => {
			console.log("Did we got a crash");
		  });
          
		  setReload(!reload);
  };*/
  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_26JvpjpFA9M2jNBCt2bJhEXE00hMF6QuDC"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
		shippingAddress
		billingAddress
      >
        <button className="btn btn-success mt-2 mb-10" >Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Proceed To Checkout </h3>
	  <h3 className="mt-3">Your bill is $ {getFinalAmount()} </h3>
      {showStripeButton()}
	  <h5>or</h5> 
    </div>
  );
};

export default StripeCheckout;
