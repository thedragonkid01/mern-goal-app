const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class userController {
  // @URI:      api/users/register
  // @Method:   POST
  register = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      res.status(400);
      throw new Error("Please enter full info");
    }

    // check duplicate
    const existedUser = await User.findOne({ email: req.body.email });
    if (existedUser) {
      res.status(400);
      throw new Error("Email is already taken");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    if (!newUser) {
      res.status(400);
      throw new Error("Unable register user");
    }

    res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: this.generateToken(newUser._id),
    });
  });

  // @URI:      api/users/login
  // @Method:   POST
  login = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(400);
      throw new Error("Please enter full info");
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400);
      throw new Error("email/password incorrect");
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: this.generateToken(user._id),
    });
  });

  // @URI:      api/users/me
  // @Method:   GET
  getMe = (req, res) => {
    res.json(req.user);
  };

  generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "1h" });
  };
}

module.exports = new userController();
