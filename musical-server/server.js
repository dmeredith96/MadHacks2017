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
        console.log('user is creating a room');
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
        console.log('user is joining a room');
        let roomId = null;
        for (let room = 0; room < connections.length; room++) {
            if (connections[room].roomId === data.roomId) {
                roomId = room;
                if (!data.didCreate) {
                    socket.join(data.roomId);
                    var newUser = { socketId: socket.id, score: 0, isPlaying: false, submittedCombination: null };
                    connections[room].users.push(newUser);
                }
                socket.emit('roomJoined', { room: connections[room], socketId: socket.id });
                socket.to(data.roomId).emit('userJoined', { newUser });
                if (connections[room].users.length >= 2 && connections[room].isActive === false) {
                    var selectedHostIndex = Math.floor(Math.random() * connections[room].users.length);
                    connections[room].hostId = connections[room].users[selectedHostIndex].socketId;
                    connections[room].isActive = true;
                    io.sockets.to(data.roomId).emit('gameIsReadyToStart', { room: connections[roomId] });
                    setTimeout(function () {
                        io.sockets.to(data.roomId).emit('hostSelectStarted');
                    }, 5000);
                }
            }
        }
        if (roomId === null) {
            console.log('user is joining a room and had a badroomid');
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
                    for (let rounds = 0; rounds < 10; rounds++) {
                        setTimeout(function () {
                            io.sockets.to(data.roomId).emit('userGuessOpen');
                            setTimeout(function () {
                                io.sockets.to(data.roomId).emit('userGuessClosed');
                                for (let tabulation = 0; tabulation < connections[room].users; tabulation++) {
                                    if (connections[room].users[tabulation].socketId !== connections[room].hostId && connections[room].users[tabulation].submittedCombination === connections[room].currentCombination) {
                                        connections[room].users[tabulation].score++;
                                    }
                                    connections[room].users[tabulation].submittedCombination = null;
                                }
                                connections[room].currentCombination = null;
                                io.sockets.to(data.roomId).emit('roundHasCompleted', { room: connections[room] });
                            }, 30000);
                        }, 10000);
                    }
                    io.sockets.to(data.roomId).emit('matchHasCompleted', { room: connections[room] });
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
                            connections[i].users.splice(j, 1);
                            break;
                        }
                    }
                }
            }
        }
    });
});