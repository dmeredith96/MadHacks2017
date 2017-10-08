import React, { Component } from 'react';
import './Scoreboard.css';

class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players || []
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            players: newProps.sort(function (a, b) { return (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0); }).toArray()
        });
    }

    render() {
        return (
            <div className="Scoreboard-container">
                <h2 className="scoreboard-header">Scoreboard</h2>
                <hr />
                <ol>
                    {this.state.players.map(function(player, i){
                        return <li key={ i }>{player.socketId}</li>;
                    })}
                </ol>
            </div>
        );
    }
}

export default Scoreboard;