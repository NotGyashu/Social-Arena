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
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
dotenv.config();




//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors(corsOptions));

//routes
app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);
app.use("/images",express.static(path.join(__dirname,'public/images')))
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/images")
    },
    filename: (req,file,cb) =>{
        cb(null,file.originalname)
    },
})
const upload = multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
return res.status(200).json("file uploaded successfully")
    }catch(err){
        console.log("error in uploading file",err)
    }
})



app.listen(5000,()=>{
    console.log('server is running on port : 5000');
})