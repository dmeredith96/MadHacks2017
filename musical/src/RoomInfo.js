import React, { Component } from 'react';
import './RoomInfo.css';
import Users from './Users';
import Scoreboard from './Scoreboard';

class RoomInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players
        }
    }

    render(){
        return(
            <div className="Room-info">
                <Users users={this.state.players}/>
                <Scoreboard players={this.state.players}/>
            </div>
        );
    }
}

export default RoomInfo;