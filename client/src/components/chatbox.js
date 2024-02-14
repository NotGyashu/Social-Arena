import { useEffect, useState } from "react";
import axios from "axios";

export const ChatBox = ({ onlineUsers, currentUser, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    // Change 1: Added try/catch block for error handling
    const getFriends = async () => {
      try {
        const res = await axios.get(`/api/user/friends/${currentUser}`);
        setFriends(res.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    getFriends();
  }, [currentUser]);

  useEffect(() => {
    // Change 2: Removed onlineFriends from the dependency array
    setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (users) => {
    try {
      const res = await axios.get(
        `/api/conversation/${users._id}/${currentUser}`
      );
      setCurrentChat(res.data);
  
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {onlineFriends.length > 0 ? (
        <div>
          <div className="text-3xl mb-3">Online Friends</div>
          {onlineFriends?.map((o) => (
            <div
              className="flex py-2.5 relative items-center  hover:bg-lime-100  rounded"
              key={o._id}
              onClick={() => {
                handleClick(o);
              }}
            >
              <div className="relative">
                <img
                  src={
                    o.profilePicture ||
                    "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
                  }
                  alt="Profile"
                  className="h-9 w-9 rounded-full border-white"
                />
                <sup className="bg-green-500 h-4 w-4 rounded-full border-2 border-white absolute left-6 top-1"></sup>
              </div>
              <span className="ml-4 font-semibold">{o.username}</span>
            </div>
          ))}
        </div>
      ) : (
        <div>No one is online</div>
      )}
    </div>
  );
};
