const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.URL;

// connect the database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// acquire the connection (to check if it is successful)
const db = mongoose.connection;

// error
db.on("error", console.error.bind(console, "error connecting to db"));

// up and running then print the message
db.once("open", function () {
  console.log("successfully connected to the database");
});

module.exports = db;
