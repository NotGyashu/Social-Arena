
import { useEffect, useState } from "react";
import axios from "axios";
export const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => 
      m !== currentUser._id
    );

    const getUser = async () => {
      try {
        const res = await axios.get(`/user?userId=${friendId}`);
        console.log(res.data);
        setUser(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation.members,currentUser]);
  return (
    <div class="flex m-3 gap-3  items-center  border-b-[1px] rounded cursor-pointer hover:bg-lime-100 p-1">
      {user && (
        <>
          <img
            src={user.profilePicture}
            alt="pic"
            class="h-9 w-9 rounded-full border border-green-600"
          />
          <span>{user.username}</span>
        </>
      )}
    </div>
  );
};
