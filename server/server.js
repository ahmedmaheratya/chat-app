const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));
    
    socket.on('createMessage', (Message, callback) => {
        console.log('createMessage', Message);

        io.emit('newMessage', generateMessage(Message.from, Message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude ));
    });

    socket.on('disconnect', () => {
        console.log('dissconnected from backend');
    });
});

server.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`);
});