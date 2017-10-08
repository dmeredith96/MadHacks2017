import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { slide as Menu } from 'react-burger-menu';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Simon from './Simon';
import LandingPage from './LandingPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null
    }
    this.getRoomId = this.getRoomId.bind(this);
  }

  getRoomId() {
    var isEntryIncorrect = true;
    while (isEntryIncorrect) {
      let roomId = prompt("What will you be known as on the page?");
      if (typeof (roomId) == "string") {
        roomId = roomId.trim();
        if (roomId !== "") {
          this.setState({ roomId: roomId })
          isEntryIncorrect = false;
        }
      }
      if (roomId === null) {
        isEntryIncorrect = false;
      }
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="menu">
            <Menu>
              <Link to='/'>
                <div onClick={this.renderNewHome} className="menu-item" title="Home">
                  <i className="fa fa-home white-menu-icon"></i>Home
              </div>
              </Link>
              <Link to='/simon'>
                <div className="menu-item" onClick={this.enterRoomId} title="New Simon Game">
                  <i className="fa fa-gamepad white-menu-icon"></i>Create Game
              </div>
              </Link>
              <Link to='/simon'>
                <div className="menu-item" title="New Simon Game">
                  <i className="fa fa-gamepad white-menu-icon"></i>Join Game
              </div>
              </Link>
            </Menu>
          </div>
          <div id="Main">
            <Route path='/simon/:room?' render={(props) => (<Simon {...props} roomId={this.state.roomId} />)} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
