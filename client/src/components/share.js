import { EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios"
export default function Share(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file,setFile]=useState(null)

    const submitHandler=async (e)=>{
e.preventDefault();
const newPost = {
  userId:user._id,
  desc: desc.current.value,
}
try{
  await axios.post("/posts",newPost)
}catch(err){

}
    }
    return (
      <div>
        <form class="box-shadow rounded-md" onSubmit={submitHandler}>
          <div class="flex space-x-5 p-3">
            <img
              src={
                user.profilePicture ? PF + user.profilePicture : PF + "th.jpg"
              }
              alt="it's to share"
              class=" h-14 w-16 rounded-full"
            ></img>
            <input
              placeholder={`Hey ${user.username}!, whats on your mind!!`}
              class="w-full focus:outline-none text-sm text-gray-700"
              ref={desc}
            ></input>
          </div>
          <hr class="m-5 border-l"></hr>
          <div class=" px-5 py-2 flex justify-between">
            <ul class="flex space-x-4 px-1 justify-center">
              <li>
                <label htmlFor="file" class="flex space-x-1 cursor-pointer hover:opacity-80">
                  <PermMedia htmlColor="tomato" />
                  <span>Photos or vedio</span>
                  <input
                    type="file"
                    accept="png,jpeg,jpg"
                    id="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                 class=" hidden" ></input>
                </label>
              </li>
              <li class="flex space-x-1">
                <Label htmlColor="blue" />
                <span>Tag</span>
              </li>
              <li class="flex space-x-1">
                <Room htmlColor="green" />
                <span>Location</span>
              </li>
              <li class="flex space-x-1">
                <EmojiEmotions htmlColor="goldenrod" />
                <span>Feelings</span>
              </li>
            </ul>
            <button class="bg-green-400 rounded-full w-20 text-white" type="submit">
              Share
            </button>
          </div>
        </form>
      </div>
    );
}