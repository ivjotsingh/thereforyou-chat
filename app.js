const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
require("dotenv/config");

/*Importing Services*/
const addUser= require("./users/addUser");
const getUsersInRoom = require("./room/getUsersInRoom")
const removeUser = require("./users/removeUser");
const router = require("./router.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(router);

io.on("connect", (socket) => {
  socket.on("join", ({ name, userType, topic }, callback) => {
    console.log("has joined");
    const { error, user,room } = addUser({ id: socket.id, name, userType, topic });

    if (error) return callback(error);

    socket.join(room._id);
    
    socket.emit("message", {
      user: "admin",
      text: `${name}, welcome to room ${room.name}.`,
    });
    socket.broadcast
      .to(room._id)
      .emit("message", { user: "admin", text: `${name} has joined!` });

    io.to(room._id).emit("roomData", {
      room: room,
      users: getUsersInRoom(room),
    });

    callback();
  });

  socket.on("sendMessage", (message, userId,roomId,userType,callback) => {
    const {user} = getUser(userId,userType);

    io.to(roomId).emit("message", { user: user, text: message });
    //This callback can be used to notify or indicate that message is sent!
    callback();
  });

  socket.on("disconnect", (userName,userType,roomId,callback) => {
    const {error,name} = removeUser(userName,userType);
    if (error) return callback(error);

    if (name) {
      io.to(roomId).emit("message", {
        user: "Admin",
        text: `${userName} has left.`,
      });
      io.to(roomId).emit("roomData", {
        users: getUsersInRoom(roomId),
      });
    }
    callback();
  });
});

server.listen(PORT, () => console.log(`Server has started. ${PORT}`));
