import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { format, register } from "timeago.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Comments = ({ post }) => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [val, setVal] = useState("");
  const [commenters, setCommenters] = useState([]);
 

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


  const Delete = async (commentId) => {
    try {
      const res = await axios.delete(`/posts/${post._id}/comment/${commentId}`);
      console.log("Comment deleted:", res.data);

      // Remove the deleted comment from the commenters state
      setCommenters((prevCommenters) =>
        prevCommenters.filter((commenter) => commenter._id !== commentId)
      );

      setDel(false);
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };


  const comment = () => {
    setOpen(true);
    console.log(post.comments);
  };

  const input = (e) => {
    setVal(e.target.value);
    console.log(val);
  };

  const send = async (e) => {
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

  const commentLiked = async(commentId)=>{
  try{
    const res = await axios.put(`/posts/${user._id}/${post._id}/${commentId}/like`)
console.log(res.data);
  }catch(err){
    console.log("err in liking the coment",err)
  }

  }
  return (
    <div className="w-full">
      <div onClick={comment} className={`${open ? "mt-3" : "mt-1"}`}>
        {open ? "Comments" : <CommentIcon />}{" "}
      </div>
      <div
        className={`${open ? " w-full p-2 border border-gray-200" : "hidden"} `}
      >
        {/* comment head */}
        <div>
          <form className="w-full flex justify-between mb-2" onSubmit={send}>
            <img
              src={user.profilePicture}
              alt="Profile"
              className="h-9 w-9 rounded-full inline border border-green-400"
            />
            <input
              type="text"
              id="comment"
              required
              className="w-[90%] bg-slate-100 rounded focus:outline-none p-1 mx-1"
              placeholder="comment"
              onChange={input}
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
              className="m-2 hover:bg-green-100 rounded-md relative p-2"
              onMouseEnter={() => {
                if (commenters[index]?._id === user._id) {
                  setDel(true);
                }
              }}
              onMouseLeave={() => {
                setDel(false);
              }}
            >
              <img
                src={commenters[index]?.profilePicture || ""}
                alt="Profile"
                className="h-7 w-7 rounded-full inline border border-green-400 m-1 "
              />
              <div class="inline text-xs absolute p-0.5 top-[-1]">
                {commenters[index]?.username.split(" ")[0] || ""} &nbsp;&nbsp;
                {format(new Date(commenters[index]?.createdAt, "en_short"))}
              </div>
              <span class="absolute p-0.5 top-5  ">{c.commentText}</span>
              <div class=" p-0.5 text-xs ">Reply</div>
              <div className="inline absolute  h-1 bottom-16 right-2 ">
                {del && (
                  <MoreVertIcon
                    fontSize="small"
                    onClick={() => Delete(c._id)}
                  />
                )}{" "}
                <FavoriteBorderIcon
                  style={{ fontSize: "16px" }}
                  onClick={() => {
                    commentLiked(c._id);
                  }}
                />
              </div>
              <span className="inline absolute  h-1 bottom-[2.8rem]  right-[.80rem]  text-xs">
                {post.comments[index]?.likes.length || ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
