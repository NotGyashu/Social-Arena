import Feed from "../components/feed";
import Rightbar from "../components/rightbar";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";


// import { Notifications,Person } from "@mui/icons-material";
export default function Home(){
  return (
    <div class="border box-border">

         <Topbar/>
       <div class="grid grid-cols-10 ">
   
         <Sidebar/>
        <div class = " col-span-8 grid-cols-8 grid border">
        <Feed/>
         <Rightbar/>
        </div>
      
       </div>
      
    </div>
)
}