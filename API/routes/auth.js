const router = require("express").Router();
const bcrypt = require("bcrypt");
const { model } = require("mongoose");
const User = require("../models/User");
const { route } = require("./user");


   //all();
   router.get("/all", async (req,res) => {
     try {
       // Access the "users" collection and print its contents
       const users = await User.find({}).exec();
       res.status(200).json(users);
       console.log('Users in the "users" collection:', users);
     } catch (err) {
       console.error("Error retrieving users:", err);
     }
   });
//register
router.post("/register", async  (req,res)=>{
    console.log("here");
 try{
    //generate new password
    const salt =await  bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
     // generate new user
    const newUser = new User({
    username:req.body.username,
    email : req.body.email,
    password: hashPassword,
    coverPicture:req.body.coverPicture,
    profilePicture:req.body.profilePicture,
    desc:req.body.desc,
    city:req.body.city,
    from:req.body.from,
    isAdmin:req.body.isAdmin,
    PhoneNo:req.body.PhoneNo
   })
   //save user and return rsponse
    const user = await newUser.save();
    res.status(200).json(user);
 }catch(err){
    console.log("err in reg user :" , err);
 }
   }
)
 
//login

router.post("/login",async (req,res)=>{

try{
   console.log("jhj")
    const user = await User.findOne({email:req.body.email});
    !user && res.status(404).json("user not found");
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
} catch(err){

    console.log("err in finding",err)

}

})
module.exports = router ;