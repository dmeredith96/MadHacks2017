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
                        <h2 classname="current-gm">Current GM: {}</h2>
                        <h2>GM choosing / Sequence Playing / GO!</h2>
                        <h2>Remaining Time: {}</h2>
                    </div>
                    <div className="Game-board">
                        <table className="gameboard-table">
                            <tr>
                                <td><button className="btn-blue">C</button></td>
                                <td><button className="btn-green">G</button></td>
                            </tr>
                            <tr>
                                <td><button className="btn-red">Am</button></td>
                                <td><button className="btn-purp">F</button></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <RoomInfo/>
            </div>
        );
    }
}

export default Simon;