import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Axios from "axios";

import { FormContainer } from "../UI/CommonStyle.js";
import { ProductConstant } from "../store/constant";
import Input from "../component/Input.js";

export default function Product() {
  const [data, setData] = useState(ProductConstant);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/product";
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          alert("You have created a new product successfully!");
          window.location = "/";
          setData(ProductConstant);
        }
      });
    } catch (e) {
      alert("Something goes wrong, please check!");
      console.log(e);
    }
  };

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    // console.log(newData);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <h3 style={{ marginBottom: "50px" }}>
            Adding a product to the MongoDB Product List
          </h3>
          <Input
            label="Title"
            id="title"
            type="text"
            value={data["title"]}
            handleChange={handleChange}
          />
          <Input
            label="Description"
            id="description"
            type="text"
            value={data["description"]}
            handleChange={handleChange}
          />
          <Input
            label="Quantity"
            id="quantity"
            type="number"
            min="1"
            step="1"
            value={data["quantity"]}
            handleChange={handleChange}
          />
          <Input
            label="Price"
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={data["price"]}
            handleChange={handleChange}
          />
          <input type="submit" value="Submit" />
          <p style={{ margin: "20px" }}>
            Note: You have already logged in to add a new product!
          </p>
          <Link to="/">Go to Home Page</Link>
        </FormContainer>
      </form>
    </React.Fragment>
  );
}
