import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Follow = () => {
  const celebrity = useParams().username;
  const { user: fan } = useContext(AuthContext);
  const [celId, setCelId] = useState(null);
  const [state, setState] = useState("Follow");
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/user?username=${celebrity}`);
        setCelId(res.data._id);
        setFollowers(res.data.followers);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUser();
  }, [celebrity]);

  useEffect(() => {
    const checkFollower = followers.find((follower) => follower === fan._id);
    setFollowing(checkFollower !== undefined);
  }, [followers, fan._id]);

  const follow = async () => {
    try {
      const res = await axios.put(`/user/${celId}/follow`, fan);
      if (res.status === 200) {
        setState("Following");
        setFollowing(true);
      }
    } catch (error) {
      console.error("Error while following:", error);
    }
  };

  const unfollow = async () => {
    try {
      const res = await axios.put(`/user/${celId}/unfollow`, fan);
      if (res.status === 200) {
        setState("Follow");
        setFollowing(false);
      }
    } catch (error) {
      console.error("Error while unfollowing:", error);
    }
  };

  const toggleFollow = () => {
    following ? unfollow() : follow();
  };

  return (
    <div
      className="bg-green-600 text-lg rounded px-2 w-[30%] cursor-pointer mt-1 text-white flex items-center justify-center gap-1"
      onClick={toggleFollow}
    >
      {following ? (
        "Following"
      ) : (
        <>
          Follow <AddIcon />
        </>
      )}
    </div>
  );
};

export default Follow;
