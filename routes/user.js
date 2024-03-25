// routes/user.js
const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

// User signup route
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, image } =
    req.body;

  const user = await userModel.findOne({ email: email });

  if (user) {
    return res.send({
      message: "Email id is already registered",
      alert: false,
    });
  } else {
    const data = await userModel({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      image,
    });
    data.save();
    return res.send({
      message: "Successfully signed up",
      alert: true,
      data: data,
    });
  }
});

// User login route
router.post("/login", async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email: email });

  if (user) {
    const dataSend = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
    };
    return res.send({
      message: "Login is successful",
      alert: true,
      data: dataSend,
    });
  } else {
    return res.send({
      message: "Email is not available, please sign up",
      alert: false,
    });
  }
});

module.exports = router;
