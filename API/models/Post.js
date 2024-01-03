const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },

    likes: {
      type: Array,
      default: [],
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model
          required: true,
        },
        commentText: {
          type: String,
          required: true,
        },
        likes:{
          type:Array,
          default:[],
        }
      
      },
    ],
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post",PostSchema)