import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Topbar() {
    const {user} = useContext(AuthContext);    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <div class="grid grid-cols-10 py-3  z-50 px-2 pt-3 text-lg bg-green-500 w-full h-12 fixed ">
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
            <a href="kh" className="topbarLink">
              Homepage
            </a>
            <a href="kh" className="topbarLink">
              Timeline
            </a>
            <a href="kh" className="topbarLink">
              New
            </a>
          </div>
          <div class="flex space-x-1 relative left-6">
            <Person />
            <sup class="bg-red-600 h-3 w-3 rounded-full relative top-0 right-4 flex justify-center items-center ">
              1
            </sup>
            <Chat />
            <sup class="bg-red-600 h-3 w-3 rounded-full top-0 right-4 flex justify-center items-center ">
              1
            </sup>
            <Notifications />
            <sup class="bg-red-600 h-3 w-3 rounded-full top-0 right-4 flex justify-center items-center ">
              1
            </sup>
          </div>
        </div>
        <Link to={`profile/${user.username}`}>
          <img
            src={
            user.profilePicture
                ? PF+user.profilePicture
                : PF + "th.jpg"
            }
            alt="its me"
            className="topbarImg"
            class="absolute w-10 h-10 right-4 top-1 rounded-full col-span-1 border border-white-500"
          ></img>
        </Link>
      </div>
    );
}