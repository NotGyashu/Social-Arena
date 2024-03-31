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
  const [status, setStatus] = useState(false);
  const [opp, setOpp] = useState(null);
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
        console.log(message.data);
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

  const handleConversationClick = async(clickedUser) => {
    setOpp(clickedUser);
    console.log("Clicked user:", clickedUser); // Access the clicked user's info
    // Use the clickedUser object here (e.g., display details, navigate to profile)
  };

  return (
    <div className="no-scrollbar">
      {/* <div className="hidden md:flex">
        <Topbar />
      </div> */}

      <div
        className={` ${
          currentChat ? "hidden sm:flex flex-col" : " flex flex-col "
        } w-full gap-1 justify-between px-2 pt-2 text-white bg-green-500`}
      >
        <div className="flex justify-between">
          <ArrowBackIcon
            onClick={() => {
              navigate(-1);
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
          <span
            className={`${
              status
                ? "opacity-[.8] lg:opacity-[1]"
                : "px-1 underline lg:no-underline "
            }`}
            onClick={() => {
              console.log(status);
              setStatus(false);
            }}
          >
            Chats
          </span>
          <span
            className={`${
              !status
                ? "opacity-[.8] lg:opacity-[1]"
                : "px-1 underline lg:no-underline "
            }`}
            onClick={() => {
              console.log(status);
              setStatus(true);
            }}
          >
            Status
          </span>
        </div>
      </div>
      <div className="grid grid-cols-10 relative">
        <div
          class=" col-span-10 sm:col-span-3    
         lg:col-span-2  flex "
        >
          {/* <input
            placeholder="Search"
            type="text"
            class=" focus:outline-none px-1 w-[90%] m-2 hidden md:flex border-b-2"
          /> */}

          <div
            class={` ${
              currentChat ? "hidden sm:flex w-full" : ""
            } h-[85vh] w-full  overflow-y-auto no-scrollbar`}
          >
            {conversation.map((c) => (
              <div
                onClick={() => {
                  setCurrentChat(c);
                }}
                className="w-full"
              >
                <Conversation
                  conversation={c}
                  currentUser={user}
                  onConversationClick={handleConversationClick}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          class={` ${
            currentChat ? "" : "hidden sm:flex"
          } col-span-10 flex flex-col sm:col-span-7 lg:col-span-6 border `}
        >
          {currentChat ? (
            <>
              <div class="sm:h-[78vh] h-[90vh]  overflow-y-scroll custom-scrollbar  rounded ">
                <div className=" sm:hidden fixed top-0 w-full h-auto  flex items-center text-white bg-green-500 justify-between px-1">
                  <div className="flex items-center gap-x-2">
                    <ArrowBackIcon
                      onClick={() => {
                        setCurrentChat(null);
                      }}
                    />
                    <div className="flex gap-x-2  text-white items-center gap-3">
                      <img
                        src={
                          opp?.profilePicture ||
                          "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
                        }
                        className="h-7 w-7 rounded-full border border-white my-1"
                      />
                      <p>{opp?.username}</p>
                    </div>
                  </div>
                  <MoreVertIcon />
                </div>
                <div className="mt-9 sm:mt-0">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Messages
                        key={m.id}
                        message={m}
                        opp={opp}
                        own={user._id === m.sender}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <span class="h-[74vh] p-5 overflow-y-scroll custom-scrollbar ">
                Start a Chat...
              </span>
            </>
          )}
          <div class="mt-3 rounded-md border flex items-center text-center fixed bg-white bottom-0 w-full sm:w-[70%] md:w-[60%]">
            <input
              placeholder="Say something"
              type="text"
              class="w-[95%] h-[10vh] focus:outline-none  p-2 "
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

        <div
          className={`${
            status ? "lg:hidden flex" : "hidden"
          } col-span-10 sm:col-span-4 border p-2 absolute top-0 right-0 min-h-screen w-full overflow-y-scroll bg-white border-l-2 `}
        >
          <ChatBox
            onlineUsers={onlineUsers}
            currentUser={user._id}
            setCurrentChat={setCurrentChat}
          />
        </div>

        <div class={`col-span-10 lg:col-span-2 border p-2 hidden lg:flex`}>
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
