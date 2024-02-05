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
// async function getAllObjectsFromMongoDB() {
//   try {
    
//     // Find all objects in the database
//     const results = await Post.find({});

//     // Log the objects
//     console.log("Before query");
    
//     console.log("After query", results);

//   } catch (err) {
//     console.error("Error retrieving objects from MongoDB:", err);
//   }

// }


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
    res.status(500).json(err,"nana");
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
// POST a comment for a specific post
router.put("/:id/comment", async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId, commentText } = req.body;

    // Validate if userId and commentText are provided
    if (!userId || !commentText) {
      return res.status(400).json({ error: "userId and commentText are required fields" });
    }

    // Find the post by ID
    const post = await Post.findById(postId);

    // If the post doesn't exist, return a 404 Not Found
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Add the comment to the post's comments array
    post.comments.push({
      userId: userId,
      commentText: commentText,
    });

    // Save the updated post
    await post.save();

    // Return the latest comments instead of the updated post
    const latestComments = post.comments;

    res.status(200).json(latestComments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//delete a comment

router.delete("/:post_id/comment/:id",async(req,res)=>{

  const { post_id, id } = req.params;

  try {
    // Find the post by postId
    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Find the index of the comment in the comments array
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === id
    );

    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Remove the comment from the comments array
    post.comments.splice(commentIndex, 1);

    // Save the updated post
    await post.save();

    // Return the latest comments instead of the updated post
    const latestComments = post.comments;

    res.status(200).json(latestComments);
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

})

// unlike a comment
router.put("/:userId/:postId/:commentId/like", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const commentId = req.params.commentId;
    
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.find((comment) => comment._id.toString() === commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const likedIndex = comment.likes.indexOf(userId);

    if (likedIndex === -1) {
      // If user hasn't liked the comment, add like
      comment.likes.push(userId);
  const response  =   await post.save();
    return  res.status(200).json(response);
    } else {
      // If user has already liked the comment, remove like
      comment.likes.splice(likedIndex, 1);
    const response =  await post.save();
     return  res.status(200).json(response);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(`Error: ${err.message}`);
  }

})
module.exports = router;
