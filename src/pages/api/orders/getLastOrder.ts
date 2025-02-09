const Order = require("../models/orderDB.js");

const getLastOrder = async (req, res) => {
  try {
    const order = await Order.findOne({}, {}, { sort: { createdAt: -1 } });
    res.json(order);
  } catch (error) {
    console.log(error);
    res.send("404");
  }
};

module.exports = getLastOrder;
