import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { format } from "timeago.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Comments = ({ post }) => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const [commenters, setCommenters] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [Post,setPost] = useState(post)
const scrollref = useRef()

  const fetchCommenters = async () => {
    console.log("joj")
    try {
      const commentersData = await Promise.all(
        Post.comments.map(async (comment) => {
          const response = await axios.get(
            `/api/user?userId=${comment.userId}`
          );
          return response.data;
        })
      );

      setCommenters(commentersData);
    } catch (error) {
      console.error("An error occurred while fetching commenters:", error);
    }
  };

  useEffect(() => {
    fetchCommenters();
    
  }, [Post.comments]);

  const handleDelete = async (commentId) => {
    try {
      const res = await axios.delete(
        `/api/posts/${Post._id}/comment/${commentId}`
      );
      // Assuming your server returns the updated comments
     setPost({
       ...post,
       comments: res.data,
     });
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleComment = () => {
    setOpen(!open);
  };

  const handleInput = (e) => {
    setVal(e.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/posts/${Post._id}/comment`, {
        userId: user._id,
        commentText: val,
      });

      setVal("");

      // Manually update the commenters state with the new comment
      // Update the post state with the new comments
      setPost({
        ...post,
        comments: res.data,
      });

      console.log(res.data);

      // Scroll to the end of the comments div
      const commentsDiv = scrollref.current;
      commentsDiv.scrollTop = commentsDiv.scrollHeight;
    } catch (err) {
      console.log("Error in sending comment", err);
    }
  };


  const handleLike = async (commentId) => {
    try {
      const res = await axios.put(
        `/api/posts/${user._id}/${Post._id}/${commentId}/like`
      );
      // Assuming your server returns the updated comment with likes
      console.log(res.data.comments.length);
      setPost({
        ...post,
        comments: res.data.comments,
      });
    } catch (err) {
      console.log("Error in liking the comment", err);
    }
  };

  return (
    <div
      className={`w-[100%] ${
        open ? "top-10 bottom-10 left-1" : " left-[92%] top-1"
      }  relative`}
    >
      <div onClick={handleComment} className={` cursor-pointer inline`}>
        {Post.comments.length} {open ? "Comments" : <ChatBubbleOutlineIcon />}
      </div>
      <div className={`${open ? " p-2 " : "hidden"}`}>
        {/* comment head */}
        <div>
          <form
            className="w-full flex justify-between mb-2"
            onSubmit={handleSend}
          >
            <img
              src={
                user.profilePicture ||
                "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
              }
              alt="Profile"
              className="h-9 w-9 rounded-full inline border border-green-400"
            />
            <input
              type="text"
              id="comment"
              required
              className="w-[90%] bg-slate-100 rounded focus:outline-none p-1 px-2 mx-1"
              placeholder="add a comment"
              onChange={handleInput}
              value={val}
            />
            <button type="submit">
              <SendIcon />
            </button>
          </form>
        </div>
        {/* comment body */}
        <div
          className="py-2 px-6 max-h-48 overflow-y-auto custom-scrollbar"
          ref={scrollref}
        >
          {Post.comments.map((c, index) => (
            <div
              key={c._id}
              className={`m-2 hover:bg-green-100 rounded-md relative p-2 ${
                hoverIndex === index ? "border border-gray-300" : ""
              }`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <img
                src={
                  commenters[index]?.profilePicture ||
                  "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
                }
                alt="Profile"
                className="h-7 w-7 rounded-full inline border border-green-400 m-1 "
              />
              <div className="inline text-xs absolute p-0.5 top-[-1]">
                {commenters[index]?.username
                  ? commenters[index]?.username.split(" ")[0]
                  : ""}{" "}
                &nbsp;&nbsp;
                {format(c.createdAt)}
              </div>
              <span className="absolute p-0.5 top-5">{c.commentText}</span>
              <div className="p-0.5 text-xs">Reply</div>
              <div className="inline absolute h-1 bottom-16 right-2 cursor-pointer">
                {user._id === commenters[index]?._id && (
                  <>
                    <MoreVertIcon
                      fontSize="small"
                      onClick={() => handleDelete(c._id)}
                    />
                    {hoverIndex === index && (
                      <div
                        className="z-20 absolute bg-slate-100 border rounded px-1 right-5 top-2 text-xs "
                        onClick={() => handleDelete(c._id)}
                      >
                        delete
                      </div>
                    )}
                  </>
                )}
                <FavoriteBorderIcon
                  style={{ fontSize: "16px" }}
                  onClick={() => handleLike(c._id)}
                />
              </div>
              <span className="inline absolute h-1 bottom-[2.8rem] right-[.80rem] text-xs ">
                {c.likes.length || ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
