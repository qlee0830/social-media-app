const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("./../models/User");

// Register
router.post("/register", async (req, res, next) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user & response
    const user = await newUser.save();
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
  }

  next();
});

// Log In
router.post("/login", async (req, res, next) => {
  try {
    // check email
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(404).json("User not found !!");

    // check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(404).json("Wrong password");

    // If both valid
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
