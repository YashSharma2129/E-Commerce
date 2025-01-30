import React, { useState, useEffect, useContext } from "react";
import CartContext from "../store/cart-context";
import { Link } from "react-router-dom";
import { ShoppingCartConstant } from "../store/constant";
import { Container } from "../UI/CommonStyle.js";
import styled from "styled-components";
import _ from "lodash";
import Axios from "axios";
import { motion } from "framer-motion";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const CartContainer = styled(Container)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
`;

const CartSummary = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
  height: fit-content;
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 2rem;
  margin-top: 2rem;
`;

const CartItem = styled(motion.div)`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ActionButton = styled.button`
  background: ${props => props.variant === 'primary' ? '#4CAF50' : '#fff'};
  color: ${props => props.variant === 'primary' ? '#fff' : '#333'};
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #ddd'};
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  svg {
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

export default function ShoppingCart(props) {
  const { isLoggedIn, user } = props;
  const cart = useContext(CartContext);
  const cartItems = cart.cartItems;

  const [price, setPrice] = useState(0);
  const [warning, showWarning] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const tempMap = {};
      const renderValue = [];

      for (let i = 0; i <= cartItems.length; i++) {
        if (cartItems[i]) {
          if (tempMap[cartItems[i].title]) {
            tempMap[cartItems[i].title].selectedQuantity += 1;
            tempMap[cartItems[i].title].totalPrice += cartItems[i].price;
          } else {
            tempMap[cartItems[i].title] = {};
            tempMap[cartItems[i].title].selectedQuantity = 1;
            tempMap[cartItems[i].title].stockQuantity = cartItems[i].quantity;
            tempMap[cartItems[i].title].eachPrice = cartItems[i].price;
            tempMap[cartItems[i].title].totalPrice = cartItems[i].price;
            tempMap[cartItems[i].title].description = cartItems[i].description;
          }
        }
      }

      const titleKeys = Object.keys(tempMap);
      for (let i = 0; i < titleKeys.length; i++) {
        const template = _.cloneDeep(ShoppingCartConstant);
        template.title = titleKeys[i];
        template.description = tempMap[titleKeys[i]].description;
        template.stockQuantity = tempMap[titleKeys[i]].stockQuantity;
        template.selectedQuantity = tempMap[titleKeys[i]].selectedQuantity;
        template.eachPrice = tempMap[titleKeys[i]].eachPrice;
        template.totalPrice = tempMap[titleKeys[i]].totalPrice;
        renderValue.push(template);
      }

      renderValue.sort((a, b) => {
        return a.eachPrice - b.eachPrice;
      });

      setShoppingCart(renderValue);
    } else {
      setPrice(0);
      setShoppingCart([]);
      showWarning(false);
    }
  }, [cartItems]);

  useEffect(() => {
    if (shoppingCart.length > 0) {
      let total = 0;
      let warning;
      for (let each of shoppingCart) {
        total += each.totalPrice;
        if (each.selectedQuantity > each.stockQuantity) {
          warning = true;
        }
      }
      if (warning) {
        showWarning(true);
      } else {
        showWarning(false);
      }
      setPrice(Number(total.toFixed(2)));
    }
  }, [shoppingCart]);

  const cartItemsSearch = (title) => {
    if (cartItems.length > 0) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]?.title === title) {
          return cartItems[i];
        }
      }
    }
  };

  const handleIncrease = (item, index) => {
    const foundItem = cartItemsSearch(item.title);
    cart.setCartItems(foundItem);
  };

  const handleDecrease = (item, index) => {
    const foundItem = cartItemsSearch(item.title);
    cart.deleteItem(foundItem);
  };

  const handleDelete = (item, index) => {
    const foundItem = cartItemsSearch(item.title);
    cart.deleteAllItems(foundItem);
  };

  const databaseUpdate = async (order) => {
    for (let each of order) {
      const foundItem = cartItemsSearch(each.title);
      const id = foundItem.id;
      const orderQuantity = each.quantity;
      const quantityInStock = foundItem.quantity;
      const leftoverQuantity = quantityInStock - orderQuantity;
      try {
        const url = "/api/product/order/" + id;
        await Axios.post(url, {
          leftoverQuantity: leftoverQuantity,
        }).then((res) => {
          if (res.status === 200) {
            cart.checkoutItems();
          }
        });
      } catch (e) {
        alert("Something goes wrong, please check!");
        console.log(e);
      }
    }
  };

  const checkoutCart = async () => {
    if (shoppingCart.length === 0) {
      alert("You do not have any item in your shopping cart to checkout.");
      return;
    }
    if (!isLoggedIn) {
      alert("You have to log in first in order to process the order.");
      return;
    }
    if (warning) {
      alert("You selected more items than the existing quantity in stock.");
      return;
    }

    const data = {
      order: [],
      total: price,
      user: user,
    };

    for (let each of shoppingCart) {
      const temp = { title: "", quantity: 0, price: 0 };
      temp.title = each.title;
      temp.quantity = each.selectedQuantity;
      temp.price = each.eachPrice;
      data.order.push(temp);
    }

    try {
      const url = "/api/order";
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          databaseUpdate(data.order);
        }
      });
    } catch (e) {
      alert("Something goes wrong, please check!");
      console.log(e);
    }
  };

  return (
    <CartContainer>
      <CartHeader>
        <div>
          <h1 style={{ fontSize: "2.5rem", color: "#2c3e50" }}>
            <ShoppingCartIcon sx={{ fontSize: 35, marginRight: '10px' }} />
            Shopping Cart
          </h1>
          <p style={{ color: "#7f8c8d", marginTop: "0.5rem" }}>
            {shoppingCart.length} items in your cart
          </p>
        </div>
        <ActionButton variant="secondary" onClick={() => cart.clearCartItems()}>
          Clear Cart
        </ActionButton>
      </CartHeader>

      <CartGrid>
        <div>
          {shoppingCart.length > 0 ? (
            shoppingCart.map((item, index) => (
              <CartItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <h3 style={{ marginBottom: "0.5rem", color: "#2c3e50" }}>{item.title}</h3>
                  <p style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>{item.description}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
                    <div>
                      <p>In Stock: <b>{item.stockQuantity}</b></p>
                      <p>Unit Price: <b>${item.eachPrice.toFixed(2)}</b></p>
                    </div>
                    <div>
                      <p style={{ color: item.selectedQuantity > item.stockQuantity ? "red" : "inherit" }}>
                        Selected: <b>{item.selectedQuantity}</b>
                      </p>
                      <p>Total: <b>${item.totalPrice.toFixed(2)}</b></p>
                    </div>
                  </div>
                </div>
                <QuantityControls>
                  <AddCircleOutlineIcon 
                    color="primary"
                    onClick={() => handleIncrease(item, index)}
                  />
                  <RemoveCircleOutlineIcon 
                    color="error"
                    onClick={() => handleDecrease(item, index)}
                  />
                  <DeleteOutlineIcon 
                    onClick={() => handleDelete(item, index)}
                  />
                </QuantityControls>
              </CartItem>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <h2>Your cart is empty</h2>
              <Link to="/" style={{ textDecoration: "none" }}>
                <ActionButton variant="primary" style={{ marginTop: "1rem" }}>
                  Continue Shopping
                </ActionButton>
              </Link>
            </div>
          )}
        </div>

        <CartSummary>
          <h2 style={{ marginBottom: "1.5rem" }}>Order Summary</h2>
          <div style={{ 
            borderBottom: "1px solid #eee",
            paddingBottom: "1rem",
            marginBottom: "1rem"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span>Subtotal</span>
              <span>${price}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <span style={{ fontWeight: "bold" }}>Total</span>
            <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>${price}</span>
          </div>

          <ActionButton 
            variant="primary" 
            style={{ width: "100%" }}
            onClick={checkoutCart}
            disabled={warning || !isLoggedIn || shoppingCart.length === 0}
          >
            <LocalShippingIcon sx={{ marginRight: '8px' }} />
            {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
          </ActionButton>

          {warning && (
            <div style={{
              color: "red",
              marginTop: "1rem",
              padding: "0.8rem",
              background: "#ffebee",
              borderRadius: "8px",
              fontSize: "0.9rem"
            }}>
              Some items exceed available stock quantity
            </div>
          )}
        </CartSummary>
      </CartGrid>
    </CartContainer>
  );
}
