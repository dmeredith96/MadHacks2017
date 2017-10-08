var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

let connections = [];
//connections is an array of objects with the following properties
//  - roomId: This is the room users are located in
//  - roundCount: count of rounds that this room has completed
//  - currentCombination: the combination that the host has selected
//  - isActive: Indicates whether or not this game is currently live
//  - users[]: This maintains a list of user objects with the following properties
//      - name:     Name of the users
//      - id:       Socket ID of the user
//      - score:    Current score of the user in the game
//      - isPlaying: Boolean value stating whether or not they are playing in the current round
//      - submittedCombination: The users combination that they have submitted in this round


io.on('connection', function (socket) {
    //createRoom(roomId) - Checks to see if a room already exists, if not fire roomCreated, else unavailableRoomId
    socket.on('createRoom', function (data) {
        let roomExists = false;
        for (let room = 0; room < connections.length; room++) {
            if (connections[room].roomId === data.roomId) {
                roomExists = true;
                socket.emit('unavailableRoomId');
            }
        }
        if (!roomExists) {
            connections.push({ roomId: data.roomId, users: [{ socketId: socket.id, score: 0, isPlaying: false, submittedCombination: null }], roundCount: null, currentCombination: null, isActive: false });
            socket.join(data.roomId);
            socket.emit('roomCreated', { roomId: data.roomId });
        }
    });

    //joinRoom(roomId) - Checks to see if the room exists, if not fire badRoomId, else roomJoined(connections[roomId]). If room is not isPlaying and user count is >2 fire gameIsReadyToStart(connections[roomId]) 
    socket.on('joinRoom', function (data) {
        let roomId = null;
        for (let room = 0; room < connections.length; room++) {
            if (connections[room].roomId === data.roomId) {
                roomId = room;
                socket.join(data.roomId);
                var newUser = { socketId: socket.id, score: 0, isPlaying: false, submittedCombination: null };
                connections[room].users.push(newUser);
                socket.emit('roomJoined', { room: connections[room] });
                socket.to(data.roomId).emit('userJoined', { newUser });
                if (connections[room].users.length >= 2) { //TODO: Add host confirmation
                    var selectedHostIndex = Math.floor(Math.random() * connections[room].users.length);
                    connections[room].hostId = connections[room].users[selectedHostIndex].id;
                    io.sockets.to(data.roomId).emit('gameIsReadyToStart', { room: connections[roomId] });
                    setTimeout(function () {
                        io.sockets.to(data.roomId).emit('hostSelectStarted');
                    }, 5000);
                }
            }
        }
        if (roomId === null) {
            socket.emit('badRoomId');
        }
    })

    //hostSubmittedChord(roomId, selection[]) - Checks to ensure the room exists and the host is the sender, if not do nothing, else fire userGuessOpen. Set timeout to fire userGuessClosed
    socket.on('hostSubmittedChord', function (data) {
        for (let room = 0; room < connections.length; room++) {
            if (connections[room].roomId === data.roomId) {
                if (connections[room].hostId === socket.id) {
                    connections[room].roundCount++;
                    connections[room].currentCombination = data.selection;
                    io.sockets.to(data.roomId).emit('hostSelection', { selection: data.selection });
                    //TODO: Set the timeout for the following function to be equal to the hostSelection timer instead of just 10 seconds
                    setTimeout(function () {
                        io.sockets.to(data.roomId).emit('userGuessOpen');
                        setTimeout(function () {
                            io.sockets.to(data.roomId).emit('userGuessClosed');
                            //TODO: Tabulate user scores
                            //TODO: Clear current combination
                            //TODO: Clear all user guesses
                            //TODO: Fire off a final event with all tabulated data to clients and setup the next round
                        }, 30000);
                    }, 10000);
                }
            }
        }
    });

    //userSubmitted(roomId, selection[]) - Checks to ensure the user is in the room, if not do nothing, else fire userHasSubmitted
    socket.on('userSubmittedChord', function (data) {
        for (let room = 0; room < connections.length; room++) {
            if (connections[room].roomId === data.roomId) {
                if (connections[room].hostId === socket.id) {
                    for (let userIndex = 0; userIndex < connections[room].users.length; userIndex++) {
                        if (connections[room].users[userIndex].id === socket.id) {
                            connections[room].users[userIndex].submittedCombination = data.selection;
                            socket.to(data.roomId).emit('userHasSubmitted', { userId: socket.id });
                        }
                    }
                }
            }
        }
    });

    //disconnecting(roomId) - Fires userDisconnecting to room
    socket.on('disconnecting', function (data) {
        for (var room in socket.rooms) {
            for (var i = 0; i < connections.length; i++) {
                if (connections[i].roomId === room) {
                    for (var j = 0; j < connections[i].users.length; j++) {
                        if (connections[i].users[j].socketId === socket.id) {
                            socket.to(room).emit('userDisconnected', { socketId: socket.id });
                            connections[i].currentConnections.splice(j, 1);
                            break;
                        }
                    }
                }
            }
        }
    });
});