import { API } from '../../backend';

export const createOrder = (userId, token, orderData) => {
	return fetch(`${API}/order/create/${userId}`, {
		method: "POST",
		headers:{
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({order: orderData})
	}).then(response => {
		console.log("response"+response);
		return response.json()
		
	})
	.catch(err => console.log(err));
}

//get all orders
export const getAllOrders = (userId, token) => {
	
  return fetch(`${API}/order/all/${userId}`, {
    method: "GET",
	headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getOrderStatus = (userId) => {
  return fetch(`${API}/order/status/${userId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateOrderStatus = (orderId, userId, token, status) => {
	return fetch(`${API}/order/${orderId}/status/${userId}`, {
		method: "PUT",
		headers:{
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({order: status})
	}).then(response => {
		console.log("response"+response);
		return response.json()
		
	})
	.catch(err => console.log(err));
};

