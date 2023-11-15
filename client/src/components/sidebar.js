import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from "@mui/icons-material";
import Friends from "./Allfriends";
import { users } from "../mock";
export default function Sidebar(){
    return (
        <div class="col-span-2  sticky top-12 overflow-y-scroll custom-scrollbar  max-h-screen ">
            <div class="">
            <ul class="p-5">
                <li class="py-2 flex items-center">
                    <RssFeed/>
                    <span class="px-4"  >Feed</span>
                </li>

                <li class="py-2 flex items-center">
                    <Chat/>
                    <span class="px-4">Chat</span>
                </li>

                <li class="py-2 flex items-center">
                    <Group/>
                    <span class="px-4">Groups</span>
                </li>

                <li class="py-2 flex items-center">
                    <Bookmark/>
                    <span class="px-4">Bookmarks</span>
                </li>

                <li class="py-2 flex items-center">
                    <PlayCircleFilledOutlined/>
                    <span class="px-4">Vedios</span>
                </li>
                <li class="py-2 flex items-center">
                    <HelpOutline/>
                    <span class="px-4">Questions</span>
                </li>
                <li class="py-2 flex items-center">
                    <WorkOutline/>
                    <span class="px-4">Jobs</span>
                </li>

                <li class="py-2 flex items-center">
                    <Event/>
                    <span class="px-4">Evets</span>
                </li>

                <li class="py-2 flex items-center">
                    <School/>
                    <span class="px-4">Courses</span>
                </li>



                </ul>
                <button class="bg-gray-300 mx-5 my--1.5 h-9 w-44 rounded-lg">show more</button>
                <hr class="my-5"></hr>
                <ul>
                  {
                    users.map((u)=>(
                    <Friends key = {users.id} user = {u}/>
                    )) 
                    
                  }
                </ul>
            </div>
        </div>
    )
}