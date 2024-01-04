import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { format } from "timeago.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
const Comments = ({ post,state }) => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const [commenters, setCommenters] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const fetchCommenters = async () => {
      try {
        const commentersData = await Promise.all(
          post.comments.map(async (comment) => {
            const response = await axios.get(`/user?userId=${comment.userId}`);
            return response.data;
          })
        );
        setCommenters(commentersData);
      } catch (error) {
        console.error("An error occurred while fetching commenters:", error);
      }
    };

    fetchCommenters();
  }, [post.comments]);

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/posts/${post._id}/comment/${commentId}`);
      setCommenters((prevCommenters) =>
        prevCommenters.filter((commenter) => commenter._id !== commentId)
      );
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
      const res = await axios.put(`/posts/${post._id}/comment`, {
        userId: user._id,
        commentText: val,
      });
      // Add logic to handle the response, if needed
    } catch (err) {
      console.log("Error in sending comment", err);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const res = await axios.put(`/posts/${user._id}/${post._id}/${commentId}/like`);
      console.log(res.data);
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
      <div
        onClick={handleComment}
        className={` cursor-pointer inline`}
      >
        {post.comments.length} {open ? "Comments" : <ChatBubbleOutlineIcon />}
      </div>
      <div className={`${open ? " p-2 " : "hidden"}`}>
        {/* comment head */}
        <div>
          <form
            className="w-full flex justify-between mb-2"
            onSubmit={handleSend}
          >
            <img
              src={user.profilePicture}
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
            />
            <button type="submit">
              <SendIcon />
            </button>
          </form>
        </div>
        {/* comment body */}
        <div className="py-2 px-6 max-h-48 overflow-y-auto custom-scrollbar">
          {post.comments.map((c, index) => (
            <div
              key={c._id}
              className={`m-2 hover:bg-green-100 rounded-md relative p-2 ${
                hoverIndex === index ? "border border-gray-300" : ""
              }`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <img
                src={commenters[index]?.profilePicture || ""}
                alt="Profile"
                className="h-7 w-7 rounded-full inline border border-green-400 m-1 "
              />
              <div className="inline text-xs absolute p-0.5 top-[-1]">
                {commenters[index]?.username.split(" ")[0] || ""} &nbsp;&nbsp;
                {format(new Date(commenters[index]?.createdAt, "en_short"))}
              </div>
              <span className="absolute p-0.5 top-5">{c.commentText}</span>
              <div className="p-0.5 text-xs">Reply</div>
              <div className="inline absolute h-1 bottom-16 right-2">
                {user._id === commenters[index]?._id && (
                  <>
                    <MoreVertIcon
                      fontSize="small"
                      onClick={() => handleDelete(c._id)}
                    />
                    {hoverIndex === index && (
                      <div
                        className="z-20 absolute bg-slate-100 border rounded px-1 right-5 top-2 text-xs"
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
              <span className="inline absolute h-1 bottom-[2.8rem] right-[.80rem] text-xs">
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
