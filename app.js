const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
require("dotenv/config");

const {
  addUser,
  removeUser,
  getUser,
} = require("./users/userCRUDController");

const getUsersInRoom = require("./room/getUsersInRoom")

const router = require("./router.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(router);

io.on("connect", (socket) => {
  socket.on("join", ({ name, userType, room }, callback) => {
    console.log("has joined");
    const { error, user,room } = addUser({ id: socket.id, name, userType, room });

    if (error) return callback(error);

    socket.join(room._id);
    
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${room.name}.`,
    });
    socket.broadcast
      .to(room._id)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(room._id).emit("roomData", {
      room: room,
      // TODO: Add error handling for getUsersInRoom ,check how the emit section can propagate error to callback
      users: getUsersInRoom(room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(room._id).emit("message", { user: user, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(room._id).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(room._id).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server has started. ${PORT}`));
