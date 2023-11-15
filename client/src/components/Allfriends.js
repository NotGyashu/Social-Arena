export default function Friends({user,userFriends}){
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const AllFriendList = ()=>{
       return (
        
        <li class="flex space-x-2 mx-5 items-center py-2">
        <img src={PF+user.profilePicture} alt="freind1" class="h-9 w-9 rounded-full"></img>
        <span>{user.username}</span>
</li>
       )
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