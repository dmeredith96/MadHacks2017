import React, { Component } from 'react';
import './Simon.css';
import RoomInfo from './RoomInfo.js';
import { joinRoom, createRoom } from './Api';
import Button from 'muicss/lib/react/button';

class Simon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: this.props.roomId || '',
            room: null
        }
    }

    componentDidMount() {
        joinRoom(this.state.roomId, '',
            (err) => this.callbackBadRoom(err),
            (err, room) => this.callbackReadyToStart(err, room),
            (err) => this.callbackHostSelectedStart(err),
            (err, room) => this.callbackRoomJoined(err, room),
            (err, user) => this.callbackUserJoined(err, user),
            (err, selection) => this.callbackHostSelection(err, selection),
            (err) => this.callbackUserGuessOpen(err),
            (err) => this.callbackUserGuessClosed(err),
            (err, userId) => this.callbackUserHasSubmitted(err, userId),
            (err, socketId) => this.callbackUserDisconnected(err, socketId));
    }

    render() {
        return (
            <div className="Container">
                <div className="Simon-container">
                    <div className="Game-info">
                        <h2 className="current-gm">Current GM: {}</h2>
                        <h2>GM choosing / Sequence Playing / GO!</h2>
                        <h2>Remaining Time: {}</h2>
                    </div>
                    <div className="Game-board">
                        <div className="gameboard-table">
                            <button className="btn-blue">C</button>
                            <button className="btn-green">G</button>
                            <button className="btn-red">Am</button>
                            <button className="btn-purp">F</button>
                        </div>
                    </div>
                </div>
                <RoomInfo />
            </div>
        );
    }

    callbackBadRoom(err) {

    }

    callbackReadyToStart(err, room) {

    }

    callbackHostSelectedStart(err) {

    }

    callbackRoomJoined(err, room) {

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
}

export default Simon;