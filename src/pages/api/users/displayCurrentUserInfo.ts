const User = require("../models/userDB.js");

const displayCurrentUserInfo = async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    let user = await User.findOne({ _id: id });
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = displayCurrentUserInfo;
