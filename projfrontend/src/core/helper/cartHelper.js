export const addItemToCart = (item, next) => {
	
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
	let product = cart.find(p => p._id == item._id);
	if(product != null){
		product.count = product.count + 1;
	}else{
		cart.push({
			  ...item,
			  count: 1
			});
	}
		
	/*cart.map((product, index) => {
		alert("here");
		if(product._id === item._id){
			product.quantity = product.quantity + 1;
			
		}
		else{
			
		}
	});*/
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = (productId) => {
	let cart = []
	if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
		}
		cart.map((product, index) => {
			if(product._id === productId){
				cart.splice(index, 1)
			}
		});
		localStorage.setItem("cart", JSON.stringify(cart));
	}
	return cart;
};

export const cartEmpty = next => {
	if (typeof window !== undefined) {
		localStorage.removeItem("cart");
		let cart = []
		localStorage.setItem("cart", JSON.stringify(cart));
		next();
	}		
}