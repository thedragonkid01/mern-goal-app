const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorHandler");
const db = require("./config/db");

const userRoute = require("./routes/userRoute");
const goalRoute = require("./routes/goalRoute");

const app = express();

// Connect database
db.connect();

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/users", userRoute);
app.use("/api/goals", goalRoute);

// Middleware Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server's started with port ${PORT}`.cyan);
});
