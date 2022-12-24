const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authHandler");

const goalController = require("../controllers/goalController");

router.get("/", protect, goalController.get);
router.get("/:id", protect, goalController.getById);
router.post("/", protect, goalController.add);
router.put("/:id", protect, goalController.update);
router.delete("/:id", protect, goalController.delete);

module.exports = router;
