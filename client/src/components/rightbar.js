import { users } from "../mock";
import Online from "./onlineFreinds";
import { useParams } from "react-router-dom";
import Friends from "./Allfriends";
import Follow from "./follow";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/AuthContext";

export default function Rightbar({ user }) {
  const { dispatch } = useContext(AuthContext);

  const username = useParams().username;
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);
  function Logout() {
    // Assuming you have a Logout action in your AuthReducer
    dispatch({ type: "Logout" });

    // Clear data from localStorage
    localStorage.removeItem("user");
    navigate("/login");
  }

  const HomeRightbar = () => {
    console.log(currentUser.followings);
    return (
      <div class="hidden lg:flex flex-col  py-5 mt-12   col-span-3  ">
        {/* BIRTHCONTAINER */}
        <div class="flex space-x-2">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/gift.jpg?alt=media&token=6964133e-2cc2-4430-a1cf-e492aeaa8316"
            alt="HAppy Birthday"
            class="h-16 "
          ></img>
          <span>
            <b>Ashraf Khan</b> and 3 others have birthday today{" "}
          </span>
        </div>

        {/* add  */}
        <img
          src="https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/add.jpg?alt=media&token=ca92dd73-e2be-40e2-bba8-24c194d80ff8"
          alt="Add"
          class="my-7 w-full  h-64 rounded-md"
        ></img>
        <hr />

        {/* online freinds */}

        <h4 class="font-semibold   my-7 text-xl">Online Freinds</h4>
        <ul>
          {users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </div>
    );
  };

  const ProfileRightbar = ({ input, username }) => {
    return (
      <div class=" mt-16 ml-5 col-span-3">
        <h1 class="font-bold"> User Information</h1>
        <ul class=" text-gray-600 ">
          <li>
            <span class="mr-2 font-semibold">City:</span>
            <span>{user.city}</span>
          </li>
          <li>
            <span class="mr-2 font-semibold">From:</span>
            <span>{user.from}</span>
          </li>
          <li>
            <span class="mr-2 font-semibold">Relationship:</span>
            <span>{user.relationship}</span>
          </li>
          <li>
            {input.username === username ? (
              <button
                className="mr-2 border rounded px-2 mt-1"
                onClick={() => navigate("./edit")}
              >
                Edit
              </button>
            ) : (
              <Follow />
            )}
          </li>
          <li class="py-2 flex items-center hover:bg-green-100 rounded pl-2">
            <LogoutIcon />
            <span class="px-4" onClick={Logout}>
              Log Out
            </span>
          </li>
        </ul>
        <h1 class="font-semibold mt-3 text-xl text-center"> User Friends</h1>
        <ul class="flex flex-wrap justify-around">
          {user.followings && user.followings.length > 0 ? (
            user.followings.map((u) => (
              <Friends key={u.id} user={u} userFriends />
            ))
          ) : (
            <p class="text-xl mt-2">No Freinds ...</p>
          )}
        </ul>
      </div>
    );
  };
  return user ? (
    <ProfileRightbar input={currentUser} username={username} />
  ) : (
    <HomeRightbar />
  );
}
