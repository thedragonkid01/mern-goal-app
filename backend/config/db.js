const mongoose = require("mongoose");
const colors = require("colors");

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connect database successful".bgCyan))
    .catch((err) => console.log(`Connect database failed: ${err}`.bgRed));
};

const db = {
  connect,
};

module.exports = db;
