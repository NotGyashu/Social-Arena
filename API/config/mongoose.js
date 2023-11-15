// get the library
const mongoose = require("mongoose");

// connect the database
mongoose.connect('mongodb://127.0.0.1:27017/SM_API');

//acquire the connection (to check if it is succesfull)
const db = mongoose.connection;

// error 
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print the message

db.once('open', function(){
    console.log("successfully connect to the database");
});


module.exports = db;