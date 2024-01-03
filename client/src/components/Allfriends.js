import { Link } from "react-router-dom";

export default function Friends({user,userFriends}){
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
        return (
           
        <img src={PF+user.profilePicture} alt="freind1" class=" h-[4.5rem] w-[4.5rem] rounded-xl
          mx-2 py-2"></img>
        

        )
    }
    return (

      userFriends? <UserFriends/>:<AllFriendList/>
      )
}