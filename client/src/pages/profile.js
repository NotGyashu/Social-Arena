import { useEffect,useState } from "react";
import Feed from "../components/feed";
import Rightbar from "../components/rightbar";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
        const [user,setUser]=useState([]);
        const [hovered,setHovered] = useState(false)
        const username= useParams().username
     
    useEffect(()=>{
        const fetchUser = async () => {
            try {
              const res = await axios.get(`/user?username=${username}`);
              setUser(res.data);
             // console.log(res);
            } catch (error) {
              // Handle the error here
              console.error("An error occurred:", error);
          
              // You can also provide more specific error handling based on the error status
              if (error.response) {
                // The request was made, and the server responded with a status code outside the range of 2xx
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
              } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received. Request:", error.request);
              } else {
                // Something happened in setting up the request that triggered the error
                console.error("Request setup error:", error.message);
              }
            }
          };
          
        fetchUser();
    },[username])
    return (
      <div>
        <Topbar />
        <div class="grid grid-cols-10 ">
          <Sidebar />
          <div class=" col-span-8 overflow-y-scroll custom-scrollbar   ">
            {/* profiletop */}
            <div class=" w-full mt-14 flex flex-col items-center justify-center ">
              <img
                src={
                  user.coverPicture
                    ? user.coverPicture
                    : "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/ai.png?alt=media&token=aad3eca2-135e-461f-8713-967cf23647d1"
                }
                alt="cover pic"
                class=" h-96 w-[98%] m-3 block "
              ></img>

              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
                }
                alt="profile pic"
                class="relative  h-[15vw] w-[15vw] border-2 top-[-6vw] border-white shadow-md rounded-full "
              ></img>
              <h1 class="mt-[-6vw] font-bold text-xl">{user.username}</h1>
              <h1>{user.desc}</h1>
            </div>
            {/* middleprofile */}
            <div class=" col-span-8 grid-cols-8 grid relative top-[-7vh]">
              <Feed username={username} />
              <Rightbar user={user} />
            </div>
          </div>
        </div>
      </div>
    );
}