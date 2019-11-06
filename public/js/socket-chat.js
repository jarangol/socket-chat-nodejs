var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('Name and room are required');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', function() {
    console.log('Connected to the server');
    socket.emit('enterChat', user, function(resp) {
        console.log(resp);
    });
});

socket.on('disconnect', function() {
    console.log('Connection to the server lost');
});

socket.on('createMsg', function(mensaje) {
    console.log('Servidor:', mensaje);
});

socket.on('peopleList', function(people) {
    console.log('Servidor:', people);
});

socket.on('privateMsg', function(msg) {
    console.log("Private msg: ", msg);
});