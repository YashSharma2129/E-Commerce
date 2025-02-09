const User = require("../models/userDB.js");

const displayUserInfo = async (req, res) => {
  try {
    let users = await User.find({});

    let results = users.map((each) => {
      return {
        id: each._id,
        firstName: each.firstName,
        lastName: each.lastName,
        email: each.email,
      };
    });

    res.json(results);
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = displayUserInfo;
