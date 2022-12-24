const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");

router.get("/", goalController.get);
router.get("/:id", goalController.getById);
router.post("/", goalController.add);
router.put("/:id", goalController.update);
router.delete("/:id", goalController.delete);

module.exports = router;
