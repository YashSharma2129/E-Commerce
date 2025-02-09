const Product = require("../models/productDB.js");

const createNewProduct = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const price = req.body.price;

  let newProduct = new Product({
    title,
    description,
    quantity,
    price,
  });

  try {
    await newProduct.save();
    res.redirect("/");
    res.json("Product created successfully!");
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = createNewProduct;
