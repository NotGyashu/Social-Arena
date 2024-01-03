import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import {format} from "timeago.js";
import axios from "axios";
import {Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Comments from "./comments";
export default function Posts({ post }) {
    // const user = users.filter(u=> u.id === 1)
    const [like, setLike] = useState(post.likes);
    const[comment,setComment] = useState(false);
    const [isliked, setIsliked] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState([]);
    const {user:currentUser} = useContext(AuthContext);
    useEffect(()=>{
        setIsliked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])

    useEffect(()=>{
        const fetchUser = async () => {
            try {
              const res = await axios.get(`/user?userId=${post.userId}`);
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
    },[post.userId])

   const likeCounter = async () => {
     try {
       // Make the PUT request to update likes
       await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });

       // Fetch the updated post after liking
       const updatedPost = await axios.get(`/posts/${post._id}`);

       // Update the like count directly from the response
       setLike(updatedPost.data.likes);
        console.log(updatedPost.data.likes.length);
     } catch (error) {
       console.error("Error in liking:", error.message);
     }
    
   };
    
    return (
      <div class="box-shadow mt-8 rounded-md p-5 w-[100%] ">
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
                className="h-9 w-9 rounded-full"
              />
            </Link>

            <span class="px-3 font-semibold">{user.username}</span>
            <span class="text-sm text-gray-500">{format(post.createdAt)}</span>
          </div>

          <div class="cursor-pointer">
            <MoreVert />
          </div>
        </div>

        {/* postCenter */}

        <div>
          <span class=" my-16">{post.desc}</span>
          <img src={post.img} alt="marvel" class=" h-auto w-full mt-4"></img>
        </div>

        {/* postBottom */}

        <div
          className={`${
            comment
              ? " h-max w-[100%]"
              : "flex justify-between items-center relative"
          }`}
        >
          <div class="flex mt-2">
            <img
              src={PF + "like.jpg"}
              alt="Like"
              class="h-6 cursor-pointer"
              onClick={likeCounter}
            ></img>
            <img
              src={PF + "heart.jpg"}
              alt="Love"
              class="h-6  cursor-pointer"
              onClick={likeCounter}
            ></img>
            <span> {like.length} people like it</span>
          </div>
          <div>
            <span
              class="border-b-2  border-dotted cursor-pointer "
              onClick={() => {
                setComment(true);
              }}
            >
              {post.comment}
              <Comments post={post}/>
            </span>
          </div>
        </div>
      </div>
    );
}