const Product = require("../models/productDB.js");

const saveEditProduct = async (req, res) => {
  const id = req.params.id || req.query.id;
  const title = req.body.title;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const price = req.body.price;

  try {
    await Product.findOneAndUpdate(
      { _id: id },
      { title, description, quantity, price }
    );
  } catch (error) {
    console.log(error);
    res.status(404);
    res.render("404");
  }

  res.json("Saved the edited product successfully!");
};

module.exports = saveEditProduct;
