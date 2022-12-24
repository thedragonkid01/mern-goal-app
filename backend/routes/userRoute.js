const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authHandler");

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", protect, userController.getMe);

module.exports = router;
