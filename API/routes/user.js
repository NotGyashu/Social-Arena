const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")    
//update user
router.put("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password ,salt);
            }catch(err){
                return res.status(500).json("err in generating new password :", err);
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
        return res.status(403).json("you are not authorised to this")
    }
})
//delete user
router.delete("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
       
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
  const username = req.query.username;
  console.log(userId);
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
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
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                     await user.updateOne({$push: {followers: req.body.userId}});
                     await currentUser.updateOne({ $push: {followings: req.params.id}});
                     res.status(200).json("user has been followed"); 
            } else {
                res.status(403).json("U already follow this User")
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
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                     await user.updateOne({$pull: {followers: req.body.userId}});
                     await currentUser.updateOne({ $pull: {followings: req.params.id}});
                     res.status(200).json("user has been unfollowed"); 
            } else {
                res.status(403).json("U dont follow this User")
            }
        }catch(err){
            res.status(500).json(`err in unfollowing user ${err}`);
        }
    }else{
              res.status(403).json("abbe lawde khud ko unfollow karega!!! ");
    }
});
module.exports = router ;