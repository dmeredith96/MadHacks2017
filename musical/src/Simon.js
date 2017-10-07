import React, { Component } from 'react';
import './Simon.css';
import RoomInfo from './RoomInfo.js';
import Button from 'muicss/lib/react/button';

class Simon extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
                        <button className="btn-blue">C</button>
                        <button className="btn-green">G</button>
                        <button className="btn-red">Am</button>
                        <button className="btn-purp">F</button>
                        
                        
                    </div>
                </div>
                <RoomInfo/>
            </div>
        );
    }
}

export default Simon;