const bcrypt = require("bcrypt");

const User = require("./../models/userModel");
const AppError = require("./../utils/appError");

// Register
exports.register = async (req, res, next) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user & response
    const user = await newUser.save();
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "This username or email has already been registered.",
    });
  }
};

// Log In
exports.login = async (req, res, next) => {
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
};
