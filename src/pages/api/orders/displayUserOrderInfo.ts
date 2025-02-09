const Order = require("../models/orderDB.js");

const displayUserOrderInfo = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;

    const order = await Order.find({ createdBy: id }).populate("createdBy");

    if (!order) res.status(404);

    const results = order.map((each) => {
      return {
        id: each._id,
        order: each.order,
        total: each.total,
        createdBy: each.createdBy,
        createdAt: each.createdAt,
      };
    });

    res.json(results);
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = displayUserOrderInfo;
