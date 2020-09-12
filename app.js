const express = require('express');
const socketio  = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 8000

const joinRoute = require('./routes/join');


const app = express();
const server = http.createServer(app);
const io = socketio(server)


io.on('connection', (socket) => {
    console.log("someone joined using socket");

    socket.on('disconnect', () => {
        console.log("socket connection broke");
    })
})


app.use('/join', joinRoute)
server.listen(PORT, () => console.log(`Server listening on Port ${PORT} ...`))