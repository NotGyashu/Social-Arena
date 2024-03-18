import { useEffect, useState } from "react";
import Feed from "../components/feed";
import Rightbar from "../components/rightbar";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Profile() {
  const [user, setUser] = useState([]);
  const [hovered, setHovered] = useState(false);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user?username=${username}`);
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
  }, [username]);
  return (
    <div class=" no-scrollbar">
      <Topbar />
      <div class="grid grid-cols-10 ">
        <Sidebar />
        <div class=" col-span-10 md:col-span-7 lg:col-span-8 overflow-y-scroll no-scrollbar  ">
          {/* profiletop */}
          <div class=" w-full mt-10 md:mt-12 lg:mt-14 flex flex-col items-center justify-center ">
            <img
              src={
                user.coverPicture
                  ? user.coverPicture
                  : "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/ai.png?alt=media&token=aad3eca2-135e-461f-8713-967cf23647d1"
              }
              alt="cover pic"
              class=" h-48 md:h-72 lg:96 w-[98%] m-3 block "
            ></img>

            <img
              src={
                user.profilePicture
                  ? user.profilePicture
                  : "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
              }
              alt="profile pic"
              class="relative  h-[30vw] md:h-[20vw] md:w-[20vw] lg:h-[15vw] lg:w-[15vw]  w-[30vw] border-2 top-[-14vw] md:top-[-10vw]  lg:top-[-10vw] border-white shadow-md rounded-full "
            ></img>
            <h1 class="mt-[-6vw] font-bold text-xl">{user.username}</h1>
            <h1 className="text-xs md:text-sm border px-7 flex justify-center items-center">{user.desc}</h1>
          </div>
          {/* middleprofile */}
          <div class=" col-span-8 grid-cols-8 grid lg:hidden relative top-[-7vh] overflow-x-hidden no-scrollbar">
            <Rightbar user={user} />
            <Feed username={username} />
          </div>
          <div class="hidden lg:grid col-span-8 grid-cols-8  relative top-[-7vh] overflow-x-hidden no-scrollbar">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
