const Order = require("../models/orderDB.js");

const getOrderDetails = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    const order = await Order.findOne({ _id: id }, (err, data) => {
      if (err) res.status(404);
      return data;
    }).populate("createdBy");

    res.json(order);
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = getOrderDetails;
