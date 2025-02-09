const Product = require("../models/productDB.js");

const displayProductInfo = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    const product = await Product.findOne({ _id: id }, (err, data) => {
      if (err) res.status(404);
      if (!data) {
        res.status(404);
      } else {
        return {
          id: data._id,
          title: data.title,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
        };
      }
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = displayProductInfo;
