import React, { useState, useEffect, useContext } from "react";
import CartContext from "../store/cart-context";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

import Input from "../component/Input.js";
import Deleting from "../component/Deleting.js";
import Editing from "../component/Editing.js";

import Card from "../UI/Card.js";
import Spinner from "../UI/Spinner.js";
import { Container, ProductFormContainer } from "../UI/CommonStyle.js";

export default function ProductList() {
  const cart = useContext(CartContext);
  const cartItems = cart.cartItems;

  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [showEditForm, isShowEditForm] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const [tempInfo, setTempInfo] = useState({});
  const [isCartItems, setIsCartItems] = useState(false);

  const fetchData = async (id) => {
    try {
      const result = await fetch("/api/product/" + id).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("not able to fetch data correctly");
        }
      });
      setProductInfo(result);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const loadData = async () => {
      await fetchData(id);
      if (isMounted) {
        setLoading(false);
        isMounted = false;
      }
    };
    loadData();

    return () => {
      setProductInfo({});
      setTempInfo({});
      isShowEditForm(false);
      setLoading(false);
    };
  }, [id]);

  useEffect(() => {
    // console.log("productInfo", productInfo);
    if (productInfo) {
      const clone = JSON.parse(JSON.stringify(productInfo));
      setTempInfo(clone);
    }
  }, [productInfo]);

  // useEffect(() => {
  //   console.log("tempInfo", tempInfo);
  // }, [tempInfo]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsCartItems(true);
    } else {
      setIsCartItems(false);
    }
  }, [cartItems]);

  const editProduct = (id) => {
    if (isCartItems) {
      alert(
        "You can not edit product detail when you have items in the cart. Please clear your shopping cart first."
      );
    } else {
      isShowEditForm(!showEditForm);
    }
  };

  const handleCancel = () => {
    isShowEditForm(false);
  };

  const handleChange = (e) => {
    const newData = { ...tempInfo };
    newData[e.target.id] = e.target.value;
    setTempInfo(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/product/edit/" + id;
      await Axios.post(url, {
        title: tempInfo.title,
        description: tempInfo.description,
        quantity: tempInfo.quantity,
        price: tempInfo.price,
      }).then((res) => {
        // window.location = "/";
        window.location.reload();
        alert("You have saved the edited product successfully!");
      });
    } catch (e) {
      alert("Something goes wrong, please check!");
      console.log(e);
    }
  };

  const deleteProduct = async (id) => {
    try {
      if (isCartItems) {
        alert(
          "You can not delete the product when you have items in the cart. Please reset your shopping cart first."
        );
      } else {
        const url = "/api/product/delete/" + id;
        await Axios.delete(url).then((res) => {
          window.location = "/";
          alert("You have deleted the product successfully!");
          // if (res.data.redirect === "/") {
          //   window.location = "/";
          // }
        });
      }
    } catch (e) {
      alert("Something goes wrong, please check!");
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <div style={{ textAlign: "center", lineHeight: "30px" }}>
          <p>Below is the product info you clicked on.</p>
          <p>Click the icon to edit or delete the product.</p>
        </div>
        {productInfo && (
          <Card>
            <div
              style={{
                fontSize: "25px",
                textAlign: "center",
                lineHeight: "150%",
              }}
            >
              <h2 style={{ marginBottom: "10px" }}>
                Title: <b>{productInfo.title}</b>
              </h2>
              <p>
                Description: <b>{productInfo.description}</b>
              </p>
              <p>
                Quantity: <b>{productInfo.quantity}</b>
              </p>
              <p>
                Price: <b>{productInfo.price}</b>
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Editing id={id} action={editProduct} />
              <Deleting id={id} action={deleteProduct} />
            </div>
          </Card>
        )}
        {showEditForm && (
          <ProductFormContainer>
            <form onSubmit={handleSubmit}>
              <Input
                label="Title"
                id="title"
                type="text"
                value={tempInfo["title"]}
                handleChange={(e) => handleChange(e)}
              />
              <Input
                label="Description"
                id="description"
                type="text"
                value={tempInfo["description"]}
                handleChange={(e) => handleChange(e)}
              />
              <Input
                label="Quantity"
                id="quantity"
                type="number"
                min="1"
                step="1"
                value={tempInfo["quantity"]}
                handleChange={(e) => handleChange(e)}
              />
              <Input
                label="Price"
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={tempInfo["price"]}
                handleChange={(e) => handleChange(e)}
              />

              <span>
                <button onClick={handleCancel}>Cancel</button>
                <input type="submit" value="Save" />
              </span>
            </form>
          </ProductFormContainer>
        )}
        {loading && <Spinner />}
        <Link to="/" style={{ marginTop: "20px" }}>
          Go to Home Page
        </Link>
      </Container>
    </React.Fragment>
  );
}
