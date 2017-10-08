import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { slide as Menu } from 'react-burger-menu';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Simon from './Simon';
import LandingPage from './LandingPage';

class App extends Component {

  renderNewHome() {
    ReactDOM.render(<LandingPage />, document.getElementById("Main"));
  }

  renderNewSimon(roomId) {
    ReactDOM.render(<Simon />, document.getElementById("Main"));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="Menu">
            <Link to='/'>
              <div onClick={this.renderNewHome} className="menu-item" title="Home">
                <i className="fa fa-home white-menu-icon"></i>
              </div>
            </Link>
            <hr />
            <Link to='/simon'>
              <div onClick={this.renderNewSimon} className="menu-item" title="New Simon Game">
                <i className="fa fa-gamepad white-menu-icon"></i>
              </div>
            </Link>
            <hr />
          </div>
          <div id="Main">
            <LandingPage />
          </div>
          <Route path='/simon/:roomId?' Component={Simon} />
        </div>
      </Router>
    );
  }
}

export default App;
