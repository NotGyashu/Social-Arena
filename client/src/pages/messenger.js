import { Conversation } from "../components/conversation";
import Topbar from "../components/topbar"
import { Messages } from "../components/messages";
import SendIcon from "@mui/icons-material/Send";
import { ChatBox } from "../components/chatbox";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {io} from "socket.io-client"

export const Messenger = ()=>{
  
const {user} = useContext(AuthContext);
const scrollRef = useRef();
const [conversation,setConversation] = useState([])
const [currentChat,setCurrentChat] = useState(null)
const [messages,setMessages] = useState([])
const [newMessage, setNewMessage] = useState(null);
const [onlineUsers, setOnlineUsers] = useState(null);
const [arrivalMessage, setArrivalMessage] = useState(null);
const [socket,setSocket] = useState(null)

 



useEffect(() => {
  const newSocket = io("ws://localhost:8900");
  setSocket(newSocket);
 

  return () => {
    // Clean up the socket connection when the component is unmounted
    newSocket.disconnect();
  };
}, []); 

useEffect(()=>{
  arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
  setMessages((prev)=>[...prev,arrivalMessage])
},[arrivalMessage,currentChat])

useEffect(() => {
  if (socket) {
    socket.emit("addUser", user._id);

    socket.on("getUsers", (users) => {
     setOnlineUsers(user.followings.filter(f => users.some(u=> u.userId === f)))
    });

     socket.on("getMessage",data=>{
    setArrivalMessage({
      sender:data.senderId,
      text:data.text,
      createdAt:Date.now()
    })
  })
  }
}, [socket, user]);




 useEffect(()=>{

  const getConversation = async()=>{ 
    try{
      const res = await axios.get(
  `/conversation/${user._id}`
);
setConversation(res.data);

}catch(err){
  console.log(err)
}

 }
getConversation();
},[user._id])


useEffect(()=>{
  const fetchMessage = async()=>{
try{

const message = await axios.get(`/message/${currentChat?._id}`);
setMessages(message.data)

}catch(err){
  console.log(err)
}
  }
  fetchMessage();
},[currentChat])


const input = (e)=>{
  setNewMessage(e.target.value)
}


const send = async(e)=>{

  e.preventDefault();
  const message = {
    sender:user._id,
    text : newMessage,
    conversationId: currentChat._id
  }
;

  const receiverId = currentChat.members.find(member=> member !== user._id)

  socket.emit("sendMessage",{
    senderId:user._id,
    receiverId,
    text:newMessage
  })

try{
  const res = await axios.post(`/message/create`,message)
setMessages([...messages,res.data.savedMessage])
setNewMessage("")

}catch(err){
  console.log(err)
}
}
useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior:"smooth"})
},[messages])

    return (
      <div>
        <Topbar />
        <div className="grid grid-cols-10 mt-12">
          <div class="col-span-2 border ">
            <input
              placeholder="Search"
              type="text"
              class=" focus:outline-none px-1 m-2 border-b-2"
           
            />
           
       
            <div class=" h-[85vh]  overflow-y-auto no-scrollbar">
              {conversation.map((c) => (
                <div
                  onClick={() => {
                    setCurrentChat(c);
                  }}
                >
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
            </div>
          </div>

          <div class="col-span-6 p-5 relative">
            {currentChat ? (
              <>
                <div class="h-[74vh] overflow-y-scroll custom-scrollbar  rounded">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Messages
                        key={m.id}
                        message={m}
                        own={user._id === m.sender}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <span class="h-[74vh] overflow-y-scroll custom-scrollbar ">
                  Start a Chat...
                </span>
              </>
            )}
            <div class="mt-3 border flex items-center text-center absolute bottom-2 w-[95%]">
              <input
                placeholder="type something"
                type="text"
                class="w-[95%] h-[10vh] focus:outline-none focus:bg-blue-100 p-2"
                onChange={input}
                value={newMessage}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    send(e);
                  }
                }}
              ></input>
              <button class="w-[2.5rem] cursor-pointer">
                <SendIcon htmlColor="green" fontSize="large" onClick={send} />
              </button>
            </div>
          </div>

          <div class="col-span-2 border p-2">
            <ChatBox onlineUsers = {onlineUsers} currentUser = {user._id} setCurrentChat = {setCurrentChat}/>
          </div>
        </div>
      </div>
    );
}