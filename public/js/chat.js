var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
} 

socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No Err.')
        }
    });
});

socket.on('disconnect', function () {
    console.log('dissconnected from server');
});

socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');

    users.forEach(function(user) {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();

    // var li = $('<li></li>')
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My Current Location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    
    // $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function(e) {
    if(!navigator.geolocation) {
        return alert('Your browser does not support this feature.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(posession) {
       locationButton.removeAttr('disabled').text('Send location');
       socket.emit('createLocationMessage', {
        latitude: posession.coords.latitude,
        longitude: posession.coords.longitude
       });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});