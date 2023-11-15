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

dotenv.config();


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);
// app.use("/public/images",express.static(path.join(__dirname,'public/images')))

app.listen(5000,()=>{
    console.log('server is running on port : 5000');
})