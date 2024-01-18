import { users } from "../mock";

export default function Online({user}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <li class="flex  space-x-2 py-2.5 ">
        <img
          src={
            
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCEBrQYHv2oA1dhpC6G8el1AZfEVnqTakWLbc-AZLLL6lurQ489nYfvWNmJeyeCl_VRqU&usqp=CAU"
          }
          alt="its me"
          className="h-9 w-9 rounded-full"
        />
        <sup class="bg-green-500 h-4 w-4 rounded-full   border-2 border-white right-4 top-1 "></sup>
        <span class=" place-self-center font-semibold ">{user.username}</span>
      </li>
    );
}