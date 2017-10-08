import React, { Component } from 'react';
import './Simon.css';
import RoomInfo from './RoomInfo.js';
import { joinRoom, createRoom, hostSubmitSelection, userSubmitSelection } from './Api';
import { ToastContainer, toast } from 'react-toastify';
import $ from 'jquery';
import Button from 'muicss/lib/react/button';
import 'react-toastify/dist/ReactToastify.min.css';


class Simon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: this.props.match.params.room || '',
            room: null,
            socketId: null,
            didCreate: false,
            currentGameStatus: 'Creating',
            remainingTime: "Unknown",
            isSelecting: false,
            currentSelection: []
        }
        this.hostSubmit = this.hostSubmit.bind(this);
        this.userSubmit = this.userSubmit.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    componentDidMount() {
        if (this.state.roomId === '') {
            this.enterRoomId();
            this.joinRoomAsComponent();
        }
        else {
            createRoom(this.state.roomId, '',
                (err) => this.callbackUnavailableRoomId(err),
                (err, roomId) => this.callbackRoomCreated(err, roomId));
        }
    }



    render() {
        if (this.state.room === null) {
            return (
                <div className="loading-screen">
                    Connecting you to the room...
                </div>
            );
        }
        else {
            return (
                <div className="Container">
                    <ToastContainer />
                    <div className="Simon-container">
                        <div className="Game-info">
                            {this.state.room.hostId !== undefined && this.state.socketId == this.state.room.hostId &&
                                <h2>Current GM: You are the GM!</h2>
                            }
                            {this.state.socketId !== this.state.room.hostId &&
                                <h2>Current GM: {this.state.room.hostId || 'This will be determined very soon...'}</h2>
                            }
                            <h2>{this.state.currentGameStatus}</h2>
                            <h2>Remaining Time: {this.state.remainingTime}</h2>
                        </div>
                        <div className="Game-board">
                            <div className="gameboard-table">
                                <input type='button' id='btn1' className="btn-blue" value='1' onClick={this.handleSelection} />
                                <input type='button' id='btn2' className="btn-green" value='2' onClick={this.handleSelection} />
                                <input type='button' id='btn3' className="btn-red" value='3' onClick={this.handleSelection} />
                                <input type='button' id='btn4' className="btn-purp" value='4' onClick={this.handleSelection} />
                            </div>
                        </div>
                        {this.state.isSelecting && this.state.room.hostId === this.state.socketId &&
                            <div className="game-selection">
                                <div className="user-selection">
                                    Your current selection: {this.state.currentSelection.map(function (select, i) {
                                        return <span key={i}>{select}</span>;
                                    })}
                                </div>
                                <input type='button' className='btn-green' value='Submit' onClick={this.hostSubmit} />
                            </div>
                        }
                        {this.state.isSelecting && this.state.room.hostId !== this.state.socketId &&
                            <div className="game-selection">
                                <div className="user-selection">
                                    Your current selection: {this.state.currentSelection.map(function (select, i) {
                                        return <span key={i}>{select}</span>;
                                    })}
                                </div>
                                <input type='button' className='btn-green' value='Submit' onClick={this.userSubmit} />
                            </div>
                        }
                    </div>
                    <RoomInfo players={this.state.room.users} />
                </div>
            );
        }
    }

    hostSubmit(event) {
        hostSubmitSelection(this.state.roomId, this.state.currentSelection);
        this.setState({ currentSelection: null, isSelecting: false });
    }

    userSubmit(event) {
        userSubmitSelection(this.state.roomId, this.state.currentSelection);
        this.setState({ currentSelection: null, isSelecting: false });
    }

    handleSelection(event) {
        let currentSelection = this.state.currentSelection;
        currentSelection.push(event.target.value);
        this.setState({ currentSelection: currentSelection });
    }

    enterRoomId() {
        this.setState({
            roomId: prompt('Enter a room ID: ')
        });
    }

    joinRoomAsComponent() {
        joinRoom(this.state.roomId, '', this.state.didCreate,
            (err) => this.callbackBadRoom(err),
            (err, room) => this.callbackReadyToStart(err, room),
            (err) => this.callbackHostSelectedStart(err),
            (err, room, socketId) => this.callbackRoomJoined(err, room, socketId),
            (err, user) => this.callbackUserJoined(err, user),
            (err, selection) => this.callbackHostSelection(err, selection),
            (err) => this.callbackUserGuessOpen(err),
            (err) => this.callbackUserGuessClosed(err),
            (err, userId) => this.callbackUserHasSubmitted(err, userId),
            (err, socketId) => this.callbackUserDisconnected(err, socketId),
            (err, room) => this.callbackRoundHasCompleted(err, room),
            (err, room) => this.callbackMatchHasCompleted(err, room));
    }

    callbackBadRoom(err) {
        createRoom(this.state.roomId, '',
            (err) => this.callbackUnavailableRoomId(err),
            (err, roomId) => this.callbackRoomCreated(err, roomId));
    }

    callbackReadyToStart(err, room) {
        this.setState({ currentGameStatus: 'Game is starting soon...', room: room });
    }

    callbackHostSelectedStart(err) {
        this.setState({ currentGameStatus: 'Host is selecting' });
        if (this.state.room.hostId === this.state.socketId) {
            this.setState({ isSelecting: true });
        }
    }

    callbackRoomJoined(err, room, socketId) {
        this.setState({
            room: room,
            roomId: room.roomId,
            socketId: socketId
        })
    }

    callbackUserJoined(err, user) {
        toast('A new user has joined: ' + user.socketId);
    }

    callbackHostSelection(err, selection) {
        this.setState({ currentGameStatus: 'Host has selected' });
        // for (var i = 0; i < selection.length; i++) {
        //     console.log($('#btn' + selection[i]));
        //     $('#btn' + selection[i]).mouseenter(function() {
        //         $(this).css('color', '#fff');
        //     });
        //     setTimeout(function () {
        //         $('#btn' + selection[i]).mouseleave();
        //     }, 1000);
        // }
        setTimeout(function () {
            if (this.state.socketId !== this.state.room.hostId) {
                this.setState({ isSelecting: true })
            }
        }.bind(this), 10000);
    }

    callbackUserGuessOpen(err) {
        this.setState({ currentGameStatus: 'You must select the same sequence as the host!', remainingTime: 30 })
    }

    callbackUserGuessClosed(err) {
        this.setState({ currentGameStatus: 'User submissions are closed', isSelecting: false });
    }

    callbackUserHasSubmitted(err, userId) {
        toast('User ' + userId + ' has submitted!');
    }

    callbackUserDisconnected(err, socketId) {
        toast('User ' + socketId + ' has disconnected');
    }

    callbackRoomCreated(err, roomId) {
        this.setState({ roomId: roomId, didCreate: true });
        this.joinRoomAsComponent();
    }

    callbackUnavailableRoomId(err) {
        this.joinRoomAsComponent();
    }

    callbackRoundHasCompleted(err, room) {
        this.setState({ room: room })
    }

    callbackMatchHasCompleted(err, room) {
        this.setState({ room: room });
    }
}

export default Simon;