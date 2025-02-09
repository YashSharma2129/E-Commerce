  const User = require("../models/userDB.js");
  const jwt = require("jsonwebtoken");

  function generateAccessToken(user) {
    try {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    } catch (err) {
      console.error("JWT Error:", err);
      throw err;
    }
    
  }
  

  const signinValidation = async (req, res) => {
    const { email, secret } = req.body;

    try {
      const foundUser = await User.findAndValidate(email, secret);
      if (foundUser) {
        const accessToken = generateAccessToken({ email: foundUser.email });
        const id = foundUser._id;
        res.json({ id, accessToken });
      } else {
        res.status(401).json("Authentication failed");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Something went wrong");
    }
  };

  module.exports = signinValidation;
