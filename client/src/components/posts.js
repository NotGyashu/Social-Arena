import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import {format} from "timeago.js";
import axios from "axios";
import {Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Posts({ post }) {
    // const user = users.filter(u=> u.id === 1)
    const [like, setLike] = useState(post.likes);
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

    function likeCounter() {
      try{
      axios.put("/posts/"+post._id+"/like",{userId:currentUser._id})
      }catch(err){

      }
        setLike(isliked ? like - 1 : like + 1)
        setIsliked(!isliked)
    }

    return (

        <div class="box-shadow mt-8 rounded-md p-5 ">

            {/* posthead */}
           
            <div class="flex  justify-between  items-center">
                <div class="flex items-center">

                    <Link to ={`/profile/${user.username}`}>
                
                    <img
                        src={ user.profilePicture? PF + user.profilePicture :PF+ "th.jpg" }
                        alt="its me"
                        className="h-9 w-9 rounded-full"
                    />

                    </Link>
                    
                    <span class="px-3 font-semibold">
                        {user.username}
                    </span>
                    <span class="text-sm text-gray-500">{format(post.createdAt)}</span>

                </div>

                <div class="cursor-pointer">
                    <MoreVert />
                </div>
            </div>

            {/* postCenter */}

            <div >
                <span class=" my-16">{post.desc}</span>
                <img src={PF + post.img} alt="marvel" class=" h-auto w-full mt-4"></img>
            </div>

            {/* postBottom */}

            <div class="flex justify-between items-center">
                <div class="flex mt-2">
                    <img src={PF+"like.jpg"} alt="Like" class="h-6 cursor-pointer" onClick={likeCounter} ></img>
                    <img src={PF+"heart.jpg"} alt="Love" class="h-6  cursor-pointer" onClick={likeCounter} ></img>
                    <span>{like.length} people like it</span>
                </div>
                <div>
                    <span class="border-b-2  border-dotted cursor-pointer">{post.comment} Comments</span>
                </div>
            </div>
        </div>
    )
}