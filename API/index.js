const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const Conversation = require("./routes/conversation");
const messageauth = require("./routes/message");
const cors = require("cors")

dotenv.config();

//middleware

app.use(helmet());
app.use(express.json());
app.use(morgan("common"));
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversation", Conversation);
app.use("/api/message", messageauth);

app.get("/", async (req, res) => {
  res.status(200).json("server is running");
});
const io = require("socket.io")(8900, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://social-arena.vercel.app",
      "https://social-arena-server.onrender.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // when connect
  console.log("A user connected.");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Event to send and receive messages
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);

    if (user && user.socketId) {
      console.log(user.socketId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      console.log("User not found or missing socketId:", receiverId);
    }
  });

  // When disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id);
    io.emit("updatedUsers", users);
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running on port : 5000");
});
