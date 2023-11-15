const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create post
router.post("/", async (req, res) => {
  const newpost = new Post(req.body);
  try {
    const savedPost = await newpost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(savedPost);
  }
});

//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("done bro");
    } else {
      res.status(403).json("you can update only ur post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("deletion done bro");
    } else {
      res.status(403).json("you can delete only ur post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like dislike

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("you liked this post");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("u disliked this post");
    }
  } catch (err) {
    res.status(500).json(`err in ${err}`);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(`err in getting the post ${err}`);
  }
});
async function getAllObjectsFromMongoDB() {
  try {
    
    // Find all objects in the database
    const results = await Post.find({});

    // Log the objects
    console.log("Before query");
    
    console.log("After query", results);

  } catch (err) {
    console.error("Error retrieving objects from MongoDB:", err);
  }

}


//get all the posts
router.get("/timeline/:userId", async (req, res) => {
  // getAllObjectsFromMongoDB();
  try {
    console.log(Post);
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const freindPosts = await Promise.all(
      currentUser.followings.map((freindId) => {
        return Post.find({ userId: freindId });
      })
    );
    res.status(200).json(userPosts.concat(...freindPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
