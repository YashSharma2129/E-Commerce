const Product = require("../models/productDB");

const displayAllProducts = async (req, res) => {
  try {
    let products = await Product.find({});

    let results = products.map((each) => {
      return {
        id: each._id,
        title: each.title,
        description: each.description,
        quantity: each.quantity,
        price: each.price,
      };
    });

    res.json(results);
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = displayAllProducts;
