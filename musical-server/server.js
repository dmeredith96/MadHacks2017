var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

let connections = [];

io.on('connection', function (socket) {
  
});