import { EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { storage } from "../firebase";
import axios from "axios";
import {
  
  ref,
  uploadBytesResumable,
  getDownloadURL,
  
} from "firebase/storage";
export default function Share(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const desc = useRef();
    const [file,setFile]=useState(null)
    const [imgLink, setImgLink] = useState(null)
    const [per,setPer] = useState(null)
const [data, setData] = useState([]);
//fetching the user

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`/user?userId=${currentUser._id}`);
      setData(res.data);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error.response);
    }
  };

  fetchUser();
}, [currentUser]);
useEffect(()=>{
 
  const uploadFile =()=>{
if(file){
       const name = new Date().getTime() + file.name;

        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

         uploadTask.on(
           "state_changed",
           (snapshot) => {
             const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             console.log("Upload is " + progress + "% done");
             setPer(progress);

             switch (snapshot.state) {
               case "paused":
                 console.log("Upload is paused");
                 break;
               case "running":
                 console.log("Upload is running");
                 break;
             }
           },
           (error) => {
             console.log(error);
           },
           () => {
             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               setImgLink(downloadURL)
               console.log("File available at", downloadURL);
             });
           }
         );

}else{
  console.log("no file detected")
}

  }
  uploadFile();


},[file])

    const submitHandler=async (e)=>{
e.preventDefault();
const newPost = {
  userId: currentUser._id,
  desc: desc.current.value,
  img: imgLink,
};
try{
const res =  await axios.post("/posts",newPost)
  if(res.status == 200){
 window.location.reload();
  }
}catch(err){

}
    }
    return (
      <div>
        <form class="box-shadow rounded-md" onSubmit={submitHandler}>
          <div class="flex space-x-5 p-3">
            <img
              src={
                data.profilePicture
                  ? data.profilePicture
                  : "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
              }
              alt="it's to share"
              class=" h-16 w-16 rounded-full"
            ></img>
            <input
              placeholder={`Hey ${data.username}!, whats on your mind!!`}
              class="w-full focus:outline-none text-sm text-gray-700"
              ref={desc}
            ></input>
          </div>
          <hr class="m-5 border-l"></hr>
          <div class=" px-5 py-2 flex justify-between">
            <ul class="flex space-x-4 px-1 justify-center">
              <li>
                <label
                  htmlFor="file"
                  class="flex space-x-1 cursor-pointer hover:opacity-80"
                >
                  <PermMedia htmlColor="tomato" />
                  <span>Photos or vedio</span>
                  <input
                    type="file"
                    accept="png,jpeg,jpg"
                    id="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    class=" hidden"
                  ></input>
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
            <button
              class={`text-white justify-center items-center  w-20 h-7 px-4 rounded-full ${
                per !== null && per < 100
                  ? "bg-green-200 cursor-not-allowed"
                  : "bg-green-500"
              }`}
              type="submit"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    );
}