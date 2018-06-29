const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('createMessage', (Message) => {
        console.log('createMessage', Message);
        io.emit('newMessage', {
            from: Message.from,
            text: Message.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on('disconnect', () => {
        console.log('dissconnected from backend');
    });
});

server.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`);
});