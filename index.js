const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const PORT = 3000;
const bot = "ChatBot"

const app = express();
const server = http.createServer(app);
const io = socketio(server);



const formatMessages = require('./utilities/messages');
const { userJoin, getCurrentUser, userLeave, getUserRoom } = require('./utilities/user');


app.use(express.static(path.join(__dirname, '/public')));


io.on('connection', socket => {
    console.log('New Socket Connection');

    //Joining a room
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit('message', formatMessages(bot, `Welcome to ${room}`));



        socket.broadcast.to(user.room).emit('message', formatMessages(bot, `${username} has connected`));

        // rooms and users
        io.to(user.room).emit('roomUsers', { room: user.room, users: getUserRoom(user.room) });

    });



    socket.on('chatMessage', message => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessages(user.username, message));
    });




    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        
        if(user){
            io.to(user.room).emit('message', formatMessages(bot, `${user.username} has disconnected`));
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getUserRoom(user.room)
            });
        }
        
    })
})



server.listen(PORT, () => {
    console.log(`Listning on port ${PORT}`);
})



