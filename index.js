const express = require('express');
const path = require('path');

const http = require('http');
const socketio = require('socket.io');

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join(__dirname, '/public')));


io.on('connection', socket =>{
    console.log('New Socket Connection');


    socket.emit('message', 'Welcome to ChatAppDemo')


    socket.broadcast.emit('message', 'a user has connected');


    socket.on('disconnect', ()=>{
        io.emit('message', 'a user has disconnected');
    })


    socket.on('chatMessage', message =>{
        io.emit('message', message);
    });
})



server.listen(PORT, ()=>{
    console.log(`Listning on port ${PORT}`);
})



