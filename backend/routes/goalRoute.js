const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "router --> ok" });
});

router.post("/", (req, res, next) => {
  res.json(req.body);
});

module.exports = router;
