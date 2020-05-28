import React, { useState, useEffect } from 'react';
import "../styles.css"
import {API} from '../backend';
import Base from './Base';
import Card from './Card';
import getProducts from './helper/coreapicalls';
import { loadCart } from './helper/cartHelper';
import StripeCheckout from './StripeCheckout';
import Paymentb from "./Paymentb"

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);
	
  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);
	
	const loadAllProducts = products => {
		return (
			<div>
			<h4 className="text-white"> Your Products. Great Choice!</h4>
			<div className="mb-4">
			{products.map((product, index) => (
			<Card key={index} product={product} removeFromCart={true} addtoCart={false} quantity={true} setReload={setReload} reload={reload} />
			))}
			</div>
			</div>
		);
	};
	
	const loadCheckout = () => {
		return (
			<div>
			<h4 className="text-white"> This Section is for checkout</h4>
			
			</div>
		)
	}
	
	const loadPaymentgateways = () => {
		return (
		<div>
			<StripeCheckout products={products} setReload={setReload} />
		
			<Paymentb products={products} setReload={setReload} />
			</div>
		)
	}
	
	return (
	<Base title="Your Cart" description="Ready to Checkout"> 
		<div className="row text-center">
		<div className="col-4">{products!=null && products.length > 0 ? loadAllProducts(products) : (<h4> No Products in your Cart</h4>)}</div>
		<div className="col-2"></div>
		<div className="col-4">{products!=null && products.length > 0 ? loadPaymentgateways() : (<p>hello</p>)}</div>
		<div className="col-2"></div> 
		</div>
	</Base>
	); 
}

export default Cart;

