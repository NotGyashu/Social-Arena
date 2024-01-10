import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import Friends from "./Allfriends";

import { AuthContext,  } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Sidebar(){
const navigate = useNavigate()
const { dispatch } = useContext(AuthContext);
const [user,setUser] = useState([])  


useEffect(()=>{
const fetchData = async () => {
  try {
    const response = await axios.get("/auth/all");
    setUser(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();
},[])


  function Logout() {
    // Assuming you have a Logout action in your AuthReducer
    dispatch({ type: "Logout" });

    // Clear data from localStorage
    localStorage.removeItem("user");
    navigate("/login");
  }
  
    return (
      <div class=" col-span-2 border sticky top-12 overflow-y-scroll custom-scrollbar  max-h-screen ">
      
          <ul>
            <div class="p-2 text-2xl font-semibold text-green-600 underline">
            Suggestions
            </div>
            {user.map((u) => (
              <Friends key={user.id} user={u} />
            ))}
          </ul>
          <button class="bg-gray-300 mx-5  h-9 w-44 rounded-lg">
            show more
          </button>
          <hr class="my-5"></hr>
          <ul class="p-5 ">
            <li class="py-2 flex items-center hover:bg-green-100 rounded pl-2">
              <RssFeed />
              <span class="px-4">Feed</span>
            </li>

            <li class="py-2 flex items-center hover:bg-green-100 rounded pl-2">
              <Chat />
              <span class="px-4">Chat</span>
            </li>

            <li class="py-2 flex items-center hover:bg-green-100 rounded pl-2">
              <Group />
              <span class="px-4">Groups</span>
            </li>

            <li class="py-2 flex items-center hover:bg-green-100 rounded pl-2">
              <Bookmark />
              <span class="px-4">Bookmarks</span>
            </li>

            <li class="py-2 flex items-center hover:bg-green-100 rounded pl-2">
              <PlayCircleFilledOutlined />
              <span class="px-4">Vedios</span>
            </li>
            <li class="py-2 flex items-center hover:bg-green-100 rounded pl-2">
              <HelpOutline />
              <span class="px-4">Questions</span>
            </li>
            <li class="py-2 flex items-center hover:bg-green-100 rounded pl-2">
              <WorkOutline />
              <span class="px-4">Jobs</span>
            </li>

            <li class="py-2 flex items-center hover:bg-green-100 rounded pl-2">
              <Event />
              <span class="px-4">Evets</span>
            </li>

            <li class="py-2 flex items-center hover:bg-green-100 rounded pl-2">
              <School />
              <span class="px-4">Courses</span>
            </li>
            <li class="py-2 flex items-center hover:bg-green-100 rounded pl-2">
              <LogoutIcon />
              <span class="px-4" onClick={Logout}>
                Log Out
              </span>
            </li>
          </ul>
     
      </div>
    );
}