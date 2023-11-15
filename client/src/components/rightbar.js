import { users } from "../mock"
import Online from "./onlineFreinds"
import Friends from "./Allfriends"
export default function Rightbar({user}){
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const HomeRightbar = ()=>{
return(
<div class="  py-5 mt-12  shrink-[2] col-span-3  ">
        {/* BIRTHCONTAINER */}
        <div class="flex space-x-2">
            <img src="\Assets\gift.jpg" alt="HAppy Birthday" class="h-16 "></img>
            <span><b>Ashraf Khan</b> and 3 others have birthday today </span>
        </div>

           {/* add  */}
           <img src="\Assets\add.jpg" alt="Add" class="my-7 w-full  h-64 rounded-md"></img><hr/>

           {/* online freinds */}

           <h4 class="font-semibold   my-7 text-xl">Online Freinds</h4>
           <ul>
          { 
            users.map((u) => (

                <Online key = {u.id} user = {u}/>

                ))
          }
            
           </ul>
        </div>
)
    }

    const ProfileRightbar = ()=>{
        return(
       
           <div class=" mt-16 ml-5 col-span-3">
             <h1 class="font-bold"> User Information</h1>
             <ul  class=" text-gray-600 ">
                <li><span class="mr-2 font-semibold">City:</span><span>{user.city}</span></li>
                <li><span class="mr-2 font-semibold">From:</span><span>{user.from}</span></li>
                <li><span class="mr-2 font-semibold">Relationship:</span><span>loved</span></li>
             </ul>
             <h1 class="font-semibold mt-3 text-xl text-center"> User Friends</h1>
             <ul class="flex flex-wrap" >
                  {
                    users.map((u)=>(
                    <Friends key = {u.id} user = {u} userFriends/>
                    )) 
                    
                  }
                </ul>
           </div>
            
        )
    }
    return (
      user? <ProfileRightbar/>:<HomeRightbar/>
    )
}