import React, { Component } from 'react';
import './RoomInfo.css';
import Users from './Users';
import Scoreboard from './Scoreboard';

class RoomInfo extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="Room-info">
                <Users/>
                <Scoreboard/>
            </div>
        );
    }
}

export default RoomInfo;