const Order = require("../models/orderDB.js");

const createShoppingOrder = async (req, res) => {
  const order = req.body.order;
  const total = req.body.total;
  const user = req.body.user;

  let newOrder = new Order({
    order: order,
    total: total,
    createdBy: user,
  });

  try {
    await newOrder.save();
    res.redirect("/");
    res.json("New Order created successfully!");
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = createShoppingOrder;
