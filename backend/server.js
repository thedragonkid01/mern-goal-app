const express = require("express");
const PORT = process.env.PORT || 5000;
const colors = require("colors");

const goalRoute = require("./routes/goalRoute");

const app = express();

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/goals", goalRoute);

app.listen(PORT, () => {
  console.log(`Server's started with port ${PORT}`.cyan);
});
