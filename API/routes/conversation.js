const router = require("express").Router();
const conversation = require("../models/Conversation");
const Conversation = require("../models/Conversation");

//create conversation
router.post("/create",async(req,res)=>{

    const newConversation = new Conversation({
       members:[req.body.senderId,req.body.receiverId]

    })

    try{
     const savedConversation =    await newConversation.save();
     res.status(200).json({
       savedConversation
     });
    }catch(err){
       res.status(500).json({
         message: "conversation not  saved",
       });
    }

})
//fetch a conversation
router.get("/:userId",async(req,res)=>{
    try{
        const conversation = await Conversation.find({
          members: { $in: [req.params.userId] },
        });
res.status(200).json(conversation)
    }catch(err){
        res.status(500).json(err)
    }
})
//fetch a conversation with two id
router.get("/:firstId/:secondId",async(req,res)=>{
    try{
        const conversation = await Conversation.findOne({
          members: { $all: [req.params.firstId, req.params.secondId] },
        });
res.status(200).json(conversation)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;