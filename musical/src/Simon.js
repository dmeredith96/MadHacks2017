import React, { Component } from 'react';
import './Simon.css';
import RoomInfo from './RoomInfo.js';
import { joinRoom, createRoom } from './Api';
import Button from 'muicss/lib/react/button';

class Simon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: this.props.match.params.room || '',
            room: null,
            didCreate: false
        }
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
                    <div className="Simon-container">
                        <div className="Game-info">
                            <h2>Current GM: {this.state.room.hostId || 'This will be determined very soon...'}</h2>
                            <h2>GM choosing / Sequence Playing / GO!</h2>
                            <h2>Remaining Time: {}</h2>
                        </div>
                        <div className="Game-board">
                            <div className="gameboard-table">
                                <button className="btn-blue">1</button>
                                <button className="btn-green">2</button>
                                <button className="btn-red">3</button>
                                <button className="btn-purp">4</button>
                            </div>
                        </div>
                    </div>
                    <RoomInfo />
                </div>
            );
        }
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
            (err, room) => this.callbackRoomJoined(err, room),
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
        this.setState({
            room: null,
            roomId: ''
        })
    }

    callbackReadyToStart(err, room) {

    }

    callbackHostSelectedStart(err) {

    }

    callbackRoomJoined(err, room) {
        this.setState({
            room: room,
            roomId: room.roomId
        })
    }

    callbackUserJoined(err, user) {
    }

    callbackHostSelection(err, selection) {

    }

    callbackUserGuessOpen(err) {

    }

    callbackUserGuessClosed(err) {

    }

    callbackUserHasSubmitted(err, userId) {

    }

    callbackUserDisconnected(err, socketId) {

    }

    callbackRoomCreated(err, roomId) {
        this.setState({roomId: roomId});
        this.joinRoomAsComponent();
    }

    callbackUnavailableRoomId(err) {
        this.joinRoomAsComponent();
    }

    callbackRoundHasCompleted(err, room) {

    }

    callbackMatchHasCompleted(err, room) {

    }
}

export default Simon;