var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

let connections = [];
//connections is an array of objects with the following properties
//  - roomId: This is the room users are located in
//  - roundCount: count of rounds that this room has completed
//  - currentCombination: the combination that the host has selected
//  - users[]: This maintains a list of user objects with the following properties
//      - name:     Name of the users
//      - id:       Socket ID of the user
//      - score:    Current score of the user in the game
//      - isPlaying: Boolean value stating whether or not they are playing in the current round


io.on('connection', function (socket) {  
    //createRoom(roomId) - Checks to see if a room already exists, if not fire roomCreated, else unavailableRoomId

    //joinRoom(roomId) - Checks to see if the room exists, if not fire badRoomId, else roomJoined(connections[roomId]). If room is not isPlaying and user count is >2 fire gameIsReadyToStart(connections[roomId]) 

    //hostSubmittedChord(roomId, selection[]) - Checks to ensure the room exists and the host is the sender, if not do nothing, else fire userGuessOpen. Set timeout to fire userGuessClosed

    //userSubmitted(roomId, selection[]) - Checks to ensure the user is in the room, if not do nothing, else fire userHasSubmitted

    //disconnecting(roomId) - Fires userDisconnecting to room
});