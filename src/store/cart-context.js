import React, { useState, useEffect } from "react";
import _ from "lodash";
import Axios from "axios";

const CartContext = React.createContext({
  cartCount: 0,
  cartItems: [],
  setCartItems: (item) => {},
  deleteItem: (item) => {},
  deleteAllItems: (item) => {},
  clearCartItems: () => {},
  checkoutItems: () => {},
});

const retrieveStoredInfo = () => {
  const storedCount = localStorage.getItem("count");
  const storedItems = JSON.parse(localStorage.getItem("items"));
  return { count: storedCount, items: storedItems };
};

export const CartContextProvider = (props) => {
  const Data = retrieveStoredInfo();
  let initialCount;
  let initialItems;
  if (Data) {
    initialCount = Data.count;
    initialItems = Data.items;
  }

  const [count, setCount] = useState(initialCount ? initialCount : 0);
  const [items, setItems] = useState(initialItems ? initialItems : []);

  useEffect(() => {
    localStorage.setItem("count", count);
    localStorage.setItem("items", JSON.stringify([...items]));
  }, [count, items]);

  const addToCartHandler = (item) => {
    const temp = _.cloneDeep(items);
    temp.push(item);

    setItems(temp);
    setCount(temp.length);
  };

  const deleteCartHandler = (item) => {
    const temp = _.cloneDeep(items);
    for (let i = 0; i < temp.length; i++) {
      if (temp[i]?.title === item.title) {
        temp.splice(i, 1);
        break;
      }
    }

    setItems(temp);
    setCount(temp.length);
  };

  const deleteAllItemsHandler = (item) => {
    const temp = _.cloneDeep(items);
    for (let i = 0; i < temp.length; i++) {
      if (temp[i]?.title === item.title) {
        temp.splice(i, 1);
        i--;
      }
    }

    setItems(temp);
    setCount(temp.length);
  };

  const clearCartHandler = () => {
    setCount(0);
    setItems([]);
    localStorage.removeItem("count");
    localStorage.removeItem("items");

    alert("Shopping cart cleared! Return back to homepage!");
    window.location = "/";
  };

  const updateCartItemQuantity = (item, quantity) => {
    const temp = _.cloneDeep(items);
    const index = temp.findIndex((i) => i.title === item.title);
    if (index !== -1) {
      temp[index].selectedQuantity = quantity;
      setItems(temp);
      setCount(temp.length);
    }
  };

  const afterCheckoutHandler = async () => {
    await Axios.get("/api/lastOrder")
      .then((res) => {
        alert("You have processed the order successfully!");
        const id = res.data._id;
        window.location = "/order/" + id;
      })
      .then((res) => {
        setCount(0);
        setItems([]);
        localStorage.removeItem("count");
        localStorage.removeItem("items");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const contextValue = {
    cartCount: count,
    cartItems: items,
    setCartItems: addToCartHandler,
    deleteItem: deleteCartHandler,
    deleteAllItems: deleteAllItemsHandler,
    clearCartItems: clearCartHandler,
    checkoutItems: afterCheckoutHandler,
    updateCartItemQuantity: updateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
