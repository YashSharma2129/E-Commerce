const User = require("../models/userDB.js");
// const session = require("express-session");

const createNewProduct = async (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const secret = req.body.secret;

  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      res.json("EXISTED");
    } else {
      let newUser = new User({
        firstName,
        lastName,
        email,
        secret,
      });
      await newUser.save();
      res.json("OK");
    }
    // req.session.user_id = newUser._id;
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

module.exports = createNewProduct;
