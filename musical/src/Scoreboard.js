import React, { Component } from 'react';
import './Scoreboard.css';

class Scoreboard extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className="Scoreboard-container">
                <h2 className="scoreboard-header">Scoreboard</h2>
                <hr/>
                <ol>
                    <li></li>
                </ol>
            </div>
        );
    }
}

export default Scoreboard;