const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
require("dotenv/config");

/*Importing Services*/
const addUser= require("./users/addUser");
const getUsersInRoom = require("./room/getUsersInRoom")
const getUser = require("./users/getUser");
const removeUser = require("./users/removeUser");
const router = require("./router.js");
const connectDb = require("./config/db");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

connectDb();

app.use(cors());

app.use(router);

io.on("connect", (socket) => {
  socket.on("join", async  ({ name, userType, topic }, callback) => {
    console.log("has joined");

    try{
    const { error, user,room } = await addUser({ id : socket.id, name, userType, topic });
    
    // if (error) return callback(error);
    // uncomment this line and resolve user does not exist thing.

    const room_id = '1234'
    
    // uncomment this line and resolve error.
    // socket.join(room._id);
    
    socket.emit("message", {
      user: "admin",
      text: `${name}, welcome to room ${room_id}.`,
    });
    socket.broadcast
      .to(room_id)
      .emit("message", { user: "admin", text: `${name} has joined!` });

    io.to(room_id).emit("roomData", {
      room: room,
      users: await getUsersInRoom(room),
    });
    callback({"room_id" : room_id});
  }
  catch(err){
    console.log(err)
    return {err:err}
  }
    
  });

  socket.on("sendMessage", async ({message, userId,roomId,userType}, callback) => {
    console.log("message received")
    console.log(message)
    console.log(userId)
    console.log(roomId)
    console.log(userType)
    try{
    const {user} = await getUser(userId,userType);

    io.to(roomId).emit("message", { user: user, text: message });
    console.log(user)
    }
    catch(err){
      console.log("error in sending message");
    }
    //This callback can be used to notify or indicate that message is sent!
    callback();
  });

  // socket.on("disconnect", (reason, userName, userType, roomId) => {
  //   if (reason === 'io server disconnect' || reason === 'transport close') {
  //     // the disconnection was initiated by the server, you need to reconnect manually
  //     // socket.connect();
  //     // console.log("connected again")
  //   }
  //   console.log("1")
  //   console.log(userName)
  //   console.log("2")
  //   console.log(userType)
  //   console.log(roomId)
  //   const {error,name} = removeUser(userName,userType);
  //   // if (error) return callback(error);

  //   if (name) {
  //     io.to(roomId).emit("message", {
  //       user: "Admin",
  //       text: `${userName} has left.`,
  //     });
  //     io.to(roomId).emit("roomData", {
  //       users: getUsersInRoom(roomId),
  //     });
  //   }
  // });
}
);

server.listen(PORT, () => console.log(`Server has started. ${PORT}`));
