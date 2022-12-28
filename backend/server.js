const path = require("path");
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

// Serve Frontend
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.use("/", (req, res) => res.send("Please set env to production"));
}

// Middleware Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server's started with port ${PORT}`.cyan);
});
