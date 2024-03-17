import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Comments from "./comments";
export default function Posts({ post }) {
  // const user = users.filter(u=> u.id === 1)

  const [like, setLike] = useState(post.likes);
  const [isliked, setIsliked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    setIsliked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user?userId=${post.userId}`);
        setUser(res.data);
        //  console.log(res.data);
      } catch (error) {
        // Handle the error here
        console.error("An error occurred:", error);

        // You can also provide more specific error handling based on the error status
        if (error.response) {
          // The request was made, and the server responded with a status code outside the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received. Request:", error.request);
        } else {
          // Something happened in setting up the request that triggered the error
          console.error("Request setup error:", error.message);
        }
      }
    };

    fetchUser();
  }, [post.userId]);

  const likeCounter = async () => {
    try {
      // Make the PUT request to update likes
      await axios.put(`/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });

      // Fetch the updated post after liking
      const updatedPost = await axios.get(`/api/posts/${post._id}`);

      // Update the like count directly from the response
      setLike(updatedPost.data.likes);
      console.log(updatedPost.data.likes.length);
    } catch (error) {
      console.error("Error in liking:", error.message);
    }
  };

  return (
    <div class="box-shadow mt-8 rounded-md p-2 md:p-5 w-[100%] ">
      {/* posthead */}

      <div class="flex  justify-between  items-center">
        <div class="flex items-center">
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? user.profilePicture
                  : "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
              }
              alt="its me"
              className="h-7 w-7 md:h-9 md:w-9 rounded-full"
            />
          </Link>

          <span class="px-3  text-sm md:text-[18px]">{user.username}</span>
          <span class="text-[10px] md:text-[14px] text-gray-500">
            {format(post.createdAt)}
          </span>
        </div>

        <div class="cursor-pointer">
          <MoreVert />
        </div>
      </div>

      {/* postCenter */}

      <div>
        <span class=" my-12 md:my-16">{post.desc}</span>
        <img src={post.img} alt="marvel" class=" h-auto w-full mt-2"></img>
      </div>

      {/* postBottom */}

      <div class={`relative`}>
        <div class="flex md:mt-2 mt-1 absolute top-0 left-0">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/like.jpg?alt=media&token=1b28a099-a14e-4f6e-b557-e7cfd89d25be"
            }
            alt="Like"
            class="h-4 md:h-5 lg:h-6 cursor-pointer"
            onClick={likeCounter}
          ></img>
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/heart.jpg?alt=media&token=164ec47a-6560-4558-808e-a624d265d305"
            }
            alt="Love"
            class="h-4 md:h-5 lg:h-6  cursor-pointer"
            onClick={likeCounter}
          ></img>
          <span className="text-[14px] md:text-[18px]">
            {" "}
            {like.length} people like it
          </span>
        </div>
        <div class="text-[14px] md:text-[18px]">
          {post.comment}
          <Comments post={post} />
        </div>
      </div>
    </div>
  );
}
