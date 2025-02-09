const Product = require("../models/productDB.js");

const updateProductQuantity = async (req, res) => {
  const id = req.params.id || req.query.id;
  const leftoverQuantity = req.body.leftoverQuantity;

  try {
    await Product.findOneAndUpdate({ _id: id }, { quantity: leftoverQuantity });
  } catch (error) {
    console.log(error);
    res.status(404);
    res.render("404");
  }

  res.json("Quantity has changed in the database!");
};

module.exports = updateProductQuantity;
