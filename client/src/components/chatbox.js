import { useEffect, useState } from "react";
import axios from "axios"
export const ChatBox = ({ onlineUsers, currentUser, setCurrentChat }) => {
const [friends,setFriends] = useState([])
const [onlineFriends,setOnlineFriends] = useState([])

useEffect(()=>{
const getFriends = async()=>{
  const res = await axios.get(`/user/friends/${currentUser}`)
  setFriends(res.data)
}
getFriends();
},[currentUser])

useEffect(()=>{
  setOnlineFriends(friends.filter((f)=>onlineUsers.includes(f._id)))
},[friends,onlineFriends])
  return (
    <div className="flex py-2.5 relative items-center">
      {onlineFriends.map((o) => (
        <div key={o.userId} className="relative">
          <img
            src={o.profilePicture}
            alt="Profile"
            className="h-9 w-9 rounded-full"
          />
          <sup className="bg-green-500 h-4 w-4 rounded-full border-2 border-white absolute left-6 top-1"></sup>
          <span className="ml-2 font-semibold">{o.username}</span>
        </div>
      ))}
    </div>
  );
};