var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('dissconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New Message', message);
    var li = $('<li></li>')
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    console.log('New Location Message', message);
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    
    $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {
        
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function(e) {
    if(!navigator.geolocation) {
        return alert('Your browser does not support this feature.');
    }

    navigator.geolocation.getCurrentPosition(function(posession) {
       socket.emit('createLocationMessage', {
        latitude: posession.coords.latitude,
        longitude: posession.coords.longitude
       });
    }, function() {
        alert('Unable to fetch location.');
    });
});