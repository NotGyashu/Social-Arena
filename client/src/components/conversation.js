import { useEffect, useState } from "react";
import axios from "axios";

export const Conversation = ({ conversation, currentUser, onConversationClick }) => {
  const [user, setUser] = useState(null);
  const [opp, setOpp] = useState(null);
  const friendId = null;
  useEffect(() => {
    const getUser = async () => {
      try {
        const friendId = conversation.members.find(
          (m) => m !== currentUser._id
        );
        const res = await axios.get(`/api/user?userId=${friendId}`);

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation.members, currentUser]);

  const handleConversationClick = () => {
    setOpp(user);
    onConversationClick(opp); // Pass opp to the callback function
  };

  return (
    <div>
      <div
        class="flex my-3 mx-1 md:mx-2 lg:mx-3 gap-3  items-center w-full  border-b-[1px] rounded cursor-pointer hover:bg-lime-100 p-1"
        onClick={handleConversationClick}
      >
        {user && (
          <>
            <img
              src={
                user.profilePicture ||
                "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
              }
              alt="pic"
              class="h-9 w-9 rounded-full border border-green-600"
            />
            <span>{user.username}</span>
          </>
        )}
      </div>
    </div>
  );
};
