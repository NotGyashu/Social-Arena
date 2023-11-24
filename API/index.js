const express = require("express");
const app = express();
const mongoose=require("mongoose");
const db = require("./config/mongoose");;
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require('path')

dotenv.config();







//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routes
app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);


app.listen(5000,()=>{
    console.log('server is running on port : 5000');
})