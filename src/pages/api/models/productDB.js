const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, min: 0, required: true },
    price: { type: Number, min: 0, required: true },
  },
  {
    collection: "product",
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
