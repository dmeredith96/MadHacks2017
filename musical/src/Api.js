import io from 'socket.io-client';

var socket = io.connect('http://localhost');
socket.open();

//joinRoom(roomId?) - Joins the specified room
function joinRoom(roomId, userName, didCreate, callbackBadRoom, callbackReadyToStart, callbackHostSelectedStart, callbackRoomJoined, callbackUserJoined, callbackHostSelection, callbackUserGuessOpen, callbackUserGuessClosed, callbackUserHasSubmitted, callbackUserDisconnected, callbackRoundHasCompleted, callbackMatchHasCompleted) {
    socket.emit('joinRoom', { roomId, userName, didCreate });
    socket.on('badRoomId', data => callbackBadRoom(null));
    socket.on('gameIsReadyToStart', data => callbackReadyToStart(null, data.room));
    socket.on('hostSelectedStart', data => callbackHostSelectedStart(null));
    socket.on('roomJoined', data => callbackRoomJoined(null, data.room, data.socketId));
    socket.on('userJoined', data => callbackUserJoined(null, data));
    socket.on('hostSelection', data => callbackHostSelection(null, data.selection));
    socket.on('userGuessOpen', data => callbackUserGuessOpen(null));
    socket.on('userGuessClosed', data => callbackUserGuessClosed(null));
    socket.on('userHasSubmitted', data => callbackUserHasSubmitted(null, data.userId));
    socket.on('userDisconnected', data => callbackUserDisconnected(null, data.socketId));
    socket.on('roundHasCompleted', data => callbackRoundHasCompleted(null, data.room));
    socket.on('matchHasCompleted', data => callbackMatchHasCompleted(null, data.room));
}

//createRoom(roomId) - Creates the specified room
function createRoom(roomId, userName, callbackUnavailableRoomId, callbackRoomCreated) {
    socket.emit('createRoom', { roomId, userName });
    socket.on('unavailableRoomId', data => callbackUnavailableRoomId(null));
    socket.on('roomCreated', data => callbackRoomCreated(null, data.roomId));
}

export { joinRoom, createRoom };