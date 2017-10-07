import React, { Component } from 'react';
import './Simon.css';
import RoomInfo from './RoomInfo.js';

class Simon extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('the component mounted');
    }

    render() {
        return(
            <div className="Container">
                <div className="Simon-container">
                    <div className="Game-info">
                        <h2>Game Information</h2>
                    </div>
                    <div className="Game-board">
                        <h2>Game Board</h2>
                    </div>
                </div>
                <RoomInfo/>
            </div>
        );
    }
}

export default Simon;