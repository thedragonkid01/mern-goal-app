const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.status(401);
    throw new Error("Unauthorized!!!");
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized!!!");
    }

    req.user = user;
  } catch (error) {
    res.status(401);
    throw new Error("Unauthorized!!!");
  }

  next();
});

module.exports = { protect };
