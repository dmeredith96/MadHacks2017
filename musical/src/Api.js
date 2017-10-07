var socket = io.connect('http://localhost');

//badRoomId() - Room does not exist, notify user

//roomJoined(connections[roomId]) - Room has been joined and user information will be sent

//unavailableRoomId() - Room already exists

//gameIsReadyToStart(connections[roomId]) - A host will have been selected and the game is beginning

//gameIsCompleted(connections[roomId]) - All users have submitted their selections and the scores will be updated on this emission

//userGuessOpen() - Allows for submissions from the user (enables input)

//userHasSubmitted(users[id]) - Another user has submitted their answer

//userGuessClosed(connections[roomId]) - Blocks user input - their time is up!

//userDisconnected(user[id]) - Notifies of a user disconnect

/********************* EMISSIONS *********************/

//joinRoom(roomId?) - Joins the specified room

//createRoom(roomId) - Creates the specified room

//hostSubmittedChord(roomId, selection[]) - Submits the chord that others will guess

//userSubmittedChord(roomId, selection[]) - Submit the chord that the user is guessing

//disconnecting(roomId) - Notifies the server that the user is leaving the room