var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'andrew@example.com',
        text: 'hey guys'
    });
});

socket.on('disconnect', function () {
    console.log('dissconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New Message', message);
});