import { useContext, useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { AuthContext } from "../context/AuthContext";
import {useEffect } from "react";
import { storage } from "../firebase";
import {
  
  ref,
  uploadBytesResumable,
  getDownloadURL,
  
} from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const Edit =()=>{
 const { user: currentUser } = useContext(AuthContext);
 const [data, setData] = useState([]);
 const [profileFile, setProfileFile] = useState(data.profilePicture);
 const [coverFile, setCoverFile] = useState(data.coverPicture);
 const navigate = useNavigate();
 const [per,setPer] = useState(null)
 


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
   },[] );



 // useEffect for profile picture
useEffect(() => {
  const updateProfilePic = async (profileFile) => {
    if (profileFile) {
      const name = new Date().getTime() + profileFile.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, profileFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Profile Picture Upload Progress:", progress);
          setPer(progress)
        },
        (error) => {
          console.error("Error during profile picture upload:", error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setData((prev) => ({ ...prev, profilePicture: downloadURL }));
            console.log("Profile Picture available at", downloadURL);
          } catch (error) {
            console.error("Error getting profile picture download URL:", error);
          }
        }
      );
    } else {
      console.log("no profile pic detected");
    }
  };

  const updateCoverPic = async (file) => {
    if (file) {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Cover Picture Upload Progress:", progress);
          setPer(progress);
        },
        (error) => {
          console.error("Error during cover picture upload:", error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setData((prev) => ({ ...prev, coverPicture: downloadURL }));
            console.log("Cover Picture available at", downloadURL);
          } catch (error) {
            console.error("Error getting cover picture download URL:", error);
          }
        }
      );
    } else {
      console.log("no cover pic detected");
    }
  };

  const updateImages = async () => {
    await updateProfilePic(profileFile);
    await updateCoverPic(coverFile);
  };

  updateImages();
}, [profileFile, coverFile]);


   const serverInput = (e) => {
     const id = e.target.id;
     const value = e.target.value;
     setData((prev) => ({ ...prev, [id]: value }));
   };
 



const Edit = async(e)=>{
 
 e.preventDefault();
   try{
   console.log(data)
  await axios.put(`/user/${currentUser._id}`, data);
 navigate(-1)
  
}catch(err){
    console.log("err in uploading", err)
   }
}

    return (
      <div class="p-3 custom-scrollbar">
        <div class=" w-full flex flex-col items-center justify-center ">
          <img
            src={
              data.coverPicture
                ? data.coverPicture
                : `https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/ai.png?alt=media&token=aad3eca2-135e-461f-8713-967cf23647d1`
            }
            alt="ssehhe"
            class=" h-96 w-[98%] m-3 block"
          ></img>

          <img
            src={
              data.profilePicture
                ? data.profilePicture
                : "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
            }
            alt="ehhe"
            class="relative  h-[15vw] w-[15vw] border-2 top-[-6vw] border-white shadow-md rounded-full "
          ></img>
          <h1 class="mt-[-6vw] font-bold text-xl">{currentUser.username}</h1>
          <h1>{currentUser.desc}</h1>
        </div>
        <form
          class="flex flex-wrap h-full w-full justify-center items-center border gap-x-10 gap-y-14 py-9 box-shadow mt-4"
          onSubmit={Edit}
        >
          <div class="w-2/5 text-lg font-thin">
            Profile Picture:
            <label htmlFor="profilePicture">
              {per > 0 && per < 100 ? (
                <LinearProgress variant="determinate" value={per} />
              ) : (
                <DriveFolderUploadIcon />
              )}
            </label>
            <input
              type="file"
              id="profilePicture"
              onChange={(e) => {
                setProfileFile(e.target.files[0]);
                //updateProfilePic(e.target.files[0]);
              }}
              class="hidden cursor-pointer focus:outline-none"
            />
          </div>
          <div class="w-2/5 text-lg font-thin">
            Cover Picture:
            <label htmlFor="coverPicture">
              {per > 0 && per < 100 ? (
                <LinearProgress variant="determinate" value={per} />
              ) : (
                <DriveFolderUploadIcon />
              )}
            </label>
            <input
              type="file"
              id="coverPicture"
              onChange={(e) => {
                setCoverFile(e.target.files[0]);
                //updateCoverPic(e.target.files[0]);
              }}
              class="hidden cursor-pointer focus:outline-none"
            />
          </div>
          <input
            id="username"
            type="text"
            placeholder="Username"
            class=" h-10 p-3 w-2/5 outline-none border border-gray-400 rounded-md"
            onChange={serverInput}
          ></input>
          <input
            id="relationship"
            type="text"
            placeholder="Relationship"
            class=" h-10 p-3 w-2/5 outline-none border border-gray-400 rounded-md"
            onChange={serverInput}
          ></input>
          <input
            id="desc"
            type="text"
            placeholder="About"
            class=" h-10 p-3 w-2/5 outline-none border border-gray-400 rounded-md"
            onChange={serverInput}
          ></input>
          <input
            id="city"
            type="text"
            placeholder="City"
            class=" h-10 p-3 w-2/5 outline-none border border-gray-400 rounded-md"
            onChange={serverInput}
          ></input>
          <input
            id="from"
            type="text"
            placeholder="From"
            class=" h-10 p-3 w-2/5 outline-none border border-gray-400 rounded-md"
            onChange={serverInput}
          ></input>

          <button
            class={` h-10 flex justify-center items-center  text-white p-3 w-2/5  rounded-md
            ${
              per !== null && per < 100
                ? "bg-green-200 cursor-not-allowed"
                : "bg-green-500"
            }  `}
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    );
}

export default Edit