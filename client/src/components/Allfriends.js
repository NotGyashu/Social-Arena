import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

export default function Friends({user,userFriends}){
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const navigate = useNavigate()
    const AllFriendList = ()=>{
  
       return (
         <Link to={`/profile/${user.username}`}>
           <li class="flex space-x-2 mx-5 items-center py-2 hover:bg-green-100 rounded px-1">
             <img
               src={
                 user.profilePicture
                   ? user.profilePicture
                   : "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
               }
               alt="freind1"
               class="h-9 w-9 rounded-full"
             ></img>

             <span>{user.username}</span>
           </li>
         </Link>
       );
    }

    const UserFriends= ()=> {

      const [nuser, setNUser] = useState(null);
      useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await axios.get(`/user?userId=${user}`);
            setNUser(res.data);
            // console.log(res);
          } catch (error) {
            // Handle the error here
            console.error("An error occurred:", error);
          }
        };

        fetchUser();
      }, [user]);
      console.log(nuser);
        return (
          
            <div class="flex flex-col space-x-3 h-[5rem] w-[5rem] justify-between items-center my-3  box-border hover:bg-green-100 rounded py-1 cursor-pointer"
            onClick={()=>{
              navigate(`/profile/${nuser.username}`);
            }}>
              <img
                src={
                  nuser?.profilePicture ||
                  "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
                }
                alt="freind1"
                class="h-[4rem] w-[4rem]  border border-green-300"
                
              />

              <div class="text-center">
                {nuser?.username && nuser.username.split(" ")[0]}
              </div>
            </div>
          
        );
    }
    return (

      userFriends? <UserFriends/>:<AllFriendList/>
      )
}