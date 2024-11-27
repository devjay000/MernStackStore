import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  const [products,setProducts] = useState([]);
  
  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // console.log("hello from fetch");
    fetch('http://localhost:4000/allproducts') 
          .then((res) => res.json()) 
          .then((data) => setProducts(data))

    if(localStorage.getItem("auth-token"))
    {
      fetch('http://localhost:4000/getcart', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json())
      .then((data) => {setCartItems([data])});
    }

}, [newArr])
  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    console.log(cartItems);
    for (let item of cartItems) {
      console.log("item price", item);
        totalAmount += item.new_price
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
        totalItem += 1;;
    }
    return totalItem;
  };
  var newArr;

  const addToCart = (product) => {
    setCartItems((prev) => ([ ...prev, product]));
    // console.log("hello from product cart");
    // console.log(cartItems);
    if(localStorage.getItem("auth-token"))
    {
      fetch('http://localhost:4000/addtocart', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({cartItems}),
    })
      .then((resp) => resp.json())
      .then((data) => {console.log(data)});
    }
    getTotalCartAmount();
    getTotalCartItems();
  };

  const removeFromCart = (id) => {
    newArr = cartItems.filter(object => object.id !== id);
    setCartItems(newArr);
    if(localStorage.getItem("auth-token"))
    {
      fetch('http://localhost:4000/removefromcart', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({newArr}),
    })
      .then((resp) => resp.json())
      .then((data) => {console.log(data)});
    }
    getTotalCartAmount();
    getTotalCartItems();
  };
  // console.log("hi from context");
  // console.log(products);
  const contextValue = {products, getTotalCartItems, cartItems, addToCart, removeFromCart, getTotalCartAmount };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
