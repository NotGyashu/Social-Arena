import Feed from "../components/feed";
import Rightbar from "../components/rightbar";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";


// import { Notifications,Person } from "@mui/icons-material";
export default function Home(){
  return (
    <div class="border box-border ">
      <Topbar />
      <div class="grid grid-cols-10 ">
        <Sidebar />
        <div class=" col-span-10 md:col-span-7 lg:col-span-8 grid  grid-cols-8 border overflow-x-hidden">
          <Feed />
          <Rightbar />
        </div>
      </div>
    </div>
  );
}