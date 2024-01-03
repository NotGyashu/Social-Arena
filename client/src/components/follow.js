import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios"
const Follow = () => {

    const celebrity = useParams().username
    const {user : fan} = useContext(AuthContext)
    const [celId,setCelId]= useState(null)
    const [state,setState] = useState("Follow") 
    const [following,setFollowing] = useState(false)
    const [followers,setFollowers] = useState([])
   
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`/user?username=${celebrity}`);
          setCelId(res.data._id);
          setFollowers(res.data.followers);
          console.log(followers);
        } catch (error) {
          // Handle the error here
          console.error("An error occurred:", error);
        }
      };

      fetchUser();

      const checkFollower = followers.find((follower) => follower === fan._id);
      setFollowing(checkFollower !== undefined);
    }, [celebrity, fan._id]);

    console.log(following);

    const follow = async()=>{
        
        const res = await axios.put(`/user/${celId}/follow`,fan)
        if(res.status == 200){
            setState("Following")
            setFollowing(true)
           // window.location.reload()
        }
    }
    const Unfollow = async()=>{
        console.log("Toggle");

         const res = await axios.put(`/user/${celId}/unfollow`,fan)
        if(res.status == 200){
            setState("Following")
            setFollowing(false)
           // window.location.reload();

        }
    }

    const toggle = ()=>{

 following ? Unfollow() : follow()

    }

  return (
    <div

      class="bg-green-600 text-lg rounded px-2 w-[30%] cursor-pointer mt-1 text-white flex items-center justify-center gap-1"
      onClick={toggle}

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
