import {
  Bookmark,
  Chat,
  Event,
  Group,
  HelpOutline,
  PlayCircleFilledOutlined,
  RssFeed,
  School,
  WorkOutline,
} from "@mui/icons-material";
import Friends from "./Allfriends";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/auth/all");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="hidden md:flex flex-col md:col-span-3 lg:col-span-2 border sticky top-12 overflow-y-scroll custom-scrollbar max-h-screen">
      <ul>
        <div className="p-2 text-2xl font-semibold text-green-600 underline mt-2">
          Suggestions
        </div>
        {user.map((u) =>
          u._id !== currentUser._id ? <Friends key={u._id} user={u} /> : null
        )}
      </ul>
      <button
        className="bg-gray-300 mx-5 h-9 w-44 rounded-lg"
        onClick={() => {
          // handle show more functionality here
        }}
      >
        Show More
      </button>
      <hr className="my-5" />
      <ul className="p-5 mb-[2rem]">
        <li className="py-2 flex items-center hover:bg-green-100 rounded pl-2">
          <RssFeed />
          <span className="px-4">Feed</span>
        </li>

        <li className="py-2 flex items-center hover:bg-green-100 rounded pl-2">
          <Chat />
          <span className="px-4">Chat</span>
        </li>

        <li className="py-2 flex items-center hover:bg-green-100 rounded pl-2">
          <Group />
          <span className="px-4">Groups</span>
        </li>

        <li className="py-2 flex items-center hover:bg-green-100 rounded pl-2">
          <Bookmark />
          <span className="px-4">Bookmarks</span>
        </li>

        <li className="py-2 flex items-center hover:bg-green-100 rounded pl-2">
          <PlayCircleFilledOutlined />
          <span className="px-4">Videos</span>
        </li>
        <li className="py-2 flex items-center hover:bg-green-100 rounded pl-2">
          <HelpOutline />
          <span className="px-4">Questions</span>
        </li>
        <li className="py-2 flex items-center hover:bg-green-100 rounded pl-2">
          <WorkOutline />
          <span className="px-4">Jobs</span>
        </li>

        <li className="py-2 flex items-center hover:bg-green-100 rounded pl-2">
          <Event />
          <span className="px-4">Events</span>
        </li>

        <li className="py-2 flex items-center hover:bg-green-100 rounded pl-2">
          <School />
          <span className="px-4">Courses</span>
        </li>
      </ul>
    </div>
  );
}
