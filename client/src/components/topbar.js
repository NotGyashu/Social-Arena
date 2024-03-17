import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [search,setSearch] = useState(false)
  const navigate = useNavigate();
  //fetching the user

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user?userId=${user._id}`);
        setData(res.data);
      } catch (error) {
        // Handle the error here
        console.error("An error occurred:", error.response);
      }
    };

    fetchUser();
  }, []);

  return (
    <div class="grid grid-cols-10 py-1 md:py-2 lg:py-3 fixed top-0 z-50  md:text-lg bg-green-500 w-full h-9 md:h-11 lg:h-12 items-center ">
      <div class="hidden md:flex text-white ml-0 md:ml-3 lg:ml-7 col-span-2">
        <span class="h-4">S</span>
        <span>ocialArena</span>
      </div>
      <div className="md:hidden text-white ">
        <Search />
      </div>
      <div class=" px-2 border h-full hidden lg:flex  bg-white rounded-full border-purple-300 col-span-4 w-full  items-center">
        <Search />
        <input
          placeholder="search for freinds , vedios, photos ..."
          className="searchInput"
          class=" w-[93%] focus:outline-none px-1  text-sm "
        ></input>
      </div>

      <div class="flex text-white  lg:justify-around justify-end  mx-2 col-span-8 md:col-span-6 lg:col-span-3 relative  ">
        <div class="hidden md:flex space-x-4 ">
          
          <a href="kh" className="topbarLink">
            Timeline
          </a>
          <a href="kh" className="topbarLink">
            New
          </a>
        </div>
        <div class="flex  space-x-3 relative  cursor-pointer">
          <div className="relative">
            <HomeIcon
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div className="relative ">
            <Person />
            <sup class="bg-red-600  h-3 w-3  rounded-full  absolute top-1 right-0  flex justify-center items-center ">
              1
            </sup>
          </div>

          <div className="relative">
            <Chat
              onClick={() => {
                navigate("/messenger");
              }}
            />

            <sup class="bg-red-600 h-3 w-3 rounded-full absolute top-1 right-0  flex justify-center items-center ">
              1
            </sup>
          </div>
          <div>
            <Notifications />
            <sup class="bg-red-600 h-3 w-3  rounded-full absolute top-1 right-0 flex justify-center items-center ">
              1
            </sup>
          </div>
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
          class="absolute w-7 h-7 md:h-9 md:w-9 lg:h-10 lg:w-10 right-1 top-1 rounded-full col-span-1 border border-white-500"
        ></img>
      </Link>
    </div>
  );
}
