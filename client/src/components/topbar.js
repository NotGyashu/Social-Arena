import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  //fetching the user

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/user?userId=${user._id}`);
        setData(res.data);
      } catch (error) {
        // Handle the error here
        console.error("An error occurred:", error.response);
      }
    };

    fetchUser();
  }, []);

  

  return (
    <div class="grid grid-cols-10 py-3 fixed top-0 z-50 px-2 pt-3 text-lg bg-green-500 w-full h-12  ">
      <div class="text-white  ml-7 col-span-2">
        <span class=" h-4">S</span>
        <span>ocialArena</span>
      </div>

      <div class=" px-2 border h-full   bg-white rounded-full border-purple-300 col-span-4 w-full flex items-center">
        <Search />
        <input
          placeholder="search for freinds , vedios, photos ..."
          className="searchInput"
          class=" w-[93%] focus:outline-none px-1 text-sm"
        ></input>
      </div>

      <div class="flex text-white justify-around   col-span-3 relative left-5 ">
        <div className="topbarLinks" class="flex space-x-4">
          <a href="/Social-Arena" className="hover:font-semibold px-1">
            Homepage
          </a>
          <a href="kh" className="topbarLink">
            Timeline
          </a>
          <a href="kh" className="topbarLink">
            New
          </a>
        </div>
        <div class="flex space-x-1 relative left-6 cursor-pointer">
        <Person />
          <sup class="bg-red-600 h-3 w-3 rounded-full relative top-0 right-4 flex justify-center items-center ">
            1
          </sup>
          
        
            <Chat onClick = {()=>{
              navigate("/messenger");
            }} />
        
          <sup class="bg-red-600 h-3 w-3 rounded-full top-0 right-4 flex justify-center items-center ">
            1
          </sup>
          <Notifications />
          <sup class="bg-red-600 h-3 w-3 rounded-full top-0 right-4 flex justify-center items-center ">
            1
          </sup>
        </div>
      </div>
      <Link to={`/profile/${data.username}`}>
        <img
          src={
            data.profilePicture
              ? data.profilePicture
              : "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
          }
          alt="its me"
          className="topbarImg"
          class="absolute w-10 h-10 right-4 top-1 rounded-full col-span-1 border border-white-500"
        ></img>
      </Link>
    </div>
  );
}