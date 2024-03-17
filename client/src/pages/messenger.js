import { Conversation } from "../components/conversation";
import Topbar from "../components/topbar";
import HomeIcon from "@mui/icons-material/Home";
import { Messages } from "../components/messages";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ChatBox } from "../components/chatbox";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
export const Messenger = () => {
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io("ws://localhost:8900");
    setSocket(newSocket);

    return () => {
      // Clean up the socket connection when the component is unmounted
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const Online = (users) => {
    setOnlineUsers((prevUsers) => {
      prevUsers = prevUsers || [];
      // Use the callback form of setOnlineUsers to ensure you're working with the latest state
      const updatedUsers = users.map((user) => user.userId);
      return [...prevUsers, ...updatedUsers];
    });
  };

  const updatedOnlineUser = (users) => {
    setOnlineUsers((prevUsers) => {
      prevUsers = prevUsers || [];
      const updatedUsers = users.map((user) => user.userId);
      const newOnlineUsers = prevUsers.filter((prevUser) =>
        updatedUsers.includes(prevUser)
      );

      return newOnlineUsers;
    });
  };

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", user._id);
      socket.on("getUsers", (users) => {
        console.log(users);
        Online(users);
      });
      socket.on("updatedUsers", (users) => {
        console.log(users);
        updatedOnlineUser(users);
      });
      socket.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }
  }, [socket, user]);

  useEffect(() => {
    console.log(onlineUsers);
  }, [onlineUsers]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`/api/conversation/${user._id}`);
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [user._id]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const message = await axios.get(`/api/message/${currentChat?._id}`);
        setMessages(message.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessage();
  }, [currentChat]);

  const input = (e) => {
    setNewMessage(e.target.value);
  };

  const send = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`/api/message/create`, message);
      setMessages([...messages, res.data.savedMessage]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="no-scrollbar">
      {/* <div className="hidden md:flex">
        <Topbar />
      </div> */}
      <div className="w-full  flex flex-col gap-1 justify-between px-2 pt-2 text-white bg-green-500">
        <div className="flex justify-between">
          <ArrowBackIcon
            onClick={() => {
              navigate("/");
            }}
          />

          <div className="flex items-center gap-2">
            <HomeIcon
              onClick={() => {
                navigate("/");
              }}
            />
            <SearchIcon />
            <MoreVertIcon />
          </div>
        </div>
        <div className="flex justify-between px-10 md:px-16 lg:px-20">
          <span>Chats</span>
          <span>Status</span>
        </div>
      </div>
      <div className="grid grid-cols-10 ">
        <div class="col-span-10  lg:col-span-2 lg:border ">
          {/* <input
            placeholder="Search"
            type="text"
            class=" focus:outline-none px-1 w-[90%] m-2 hidden md:flex border-b-2"
          /> */}

          <div
            class={` ${
              currentChat ? "" : ""
            } h-[85vh]  overflow-y-auto no-scrollbar`}
          >
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

        <div class="col-span-10 lg:col-span-6 p-5 relative">
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

        <div class="col-span-10 lg:col-span-2 border p-2">
          <ChatBox
            onlineUsers={onlineUsers}
            currentUser={user._id}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </div>
  );
};
