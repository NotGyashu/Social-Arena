const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")    

//update user
router.put("/:id", async (req,res)=>{
  
    if(req.body._id === req.params.id || req.body.isAdmin){

        if(req.body.password){
                    if(req.body.password === req.body.confirmPassword){
                      try {
                        const salt = await bcrypt.genSalt(10);
                        req.body.password = await bcrypt.hash(
                          req.body.password,
                          salt
                        );
                         
                      } catch (err) {
                        console.error("Error generating new password:", err);
                        return res.status(500).json({
                          error: "Internal Server Error",
                        });
                      }
                      }else{
                         return res.status(500).json({
                           message:
                             "Passwords are not equal",
                           password: req.body.password,
                           confirmPassword: req.body.confirmPassword
                         });
                      }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body ,
            });
            res.status(200).json("Account updated");
        }catch(err){
            
            return res.status(500).json("err in updating account :", err);
        }

    }else{
        
        return res.status(403).json({
          message: "You are not authorized to access this resource",
         
        });
    }
})
//delete user
router.delete("/:id", async (req,res)=>{
    if(req.body._id === req.params.id || req.body.isAdmin){
       
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account deleted");
        }catch(err){
            return res.status(500).json(`err in deleting account :,${err}`);
        }

    }else{
        return res.status(403).json("you are not authorised to delete this this")
    }
})
//get user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username ;
  const email = req.query.email
  console.log(userId);
  try {
   const user = userId
     ? await User.findById(userId)
     : username
     ? await User.findOne({ username: username })
     : await User.findOne({ email: email });
    
      
    if (user && user._doc) {
      const { password, updatedAt, ...userWithoutSensitiveInfo } = user._doc;
      res.status(200).json(userWithoutSensitiveInfo);
    } else {
      // Handle the case where user is null or undefined
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json(`err in getting user : ${err}`);
  }
});

//follower user
router.put("/:id/follow" , async (req,res)=>{
    if(req.body._id !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body._id);
            if(!user.followers.includes(req.body._id)){
                     await user.updateOne({$push: {followers: req.body._id}});
                     await currentUser.updateOne({ $push: {followings: req.params.id}});
                     res.status(200).json("user has been followed"); 
            } else {
                res.json("U already follow this User")
            }
        }catch(err){
            res.status(500).json(`err in following user ${err}`);
        }
    }else{
              res.status(403).json("abbe lawde khud ko follow karega!!! ");
    }
});

// unfollw user
router.put("/:id/unfollow" , async (req,res)=>{
    if(req.body._id !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body._id);
            if(user.followers.includes(req.body._id)){
                     await user.updateOne({$pull: {followers: req.body._id}});
                     await currentUser.updateOne({ $pull: {followings: req.params.id}});
                     res.status(200).json("user has been unfollowed"); 
            } else {
                res.json("U dont follow this User")
            }
        }catch(err){
            res.status(500).json(`err in unfollowing user ${err}`);
        }
    }else{
              res.status(403).json({mesage:"abbe lawde khud ko unfollow karega!!! ",
            
            });
    }
});
//get all friends
router.get("/friends/:userId",async(req,res)=>{
  try{
    const user = await User.findById(req.params.userId)
    const friends = await Promise.all(
      user.followings.map((friendId)=>{
        return User.findById(friendId)
      })
    );
    
 let freindList = []

 friends.map((friend)=>{
  const {_id,username,profilePicture} = friend;
  freindList.push({_id,username,profilePicture})
 })
 
 return res.status(200).json(freindList)
  }catch(err){
    console.log("err in finding friend",err);
  }
})
module.exports = router ;