import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {slide as Menu} from 'react-burger-menu';
import Simon from './Simon';
import LandingPage from './LandingPage';

class App extends Component {

  showSettings(event) {

  }

  renderNewHome () {
    ReactDOM.render(<LandingPage/>, document.getElementById("Main"));    
  }

  renderNewSimon () {
    ReactDOM.render(<Simon/>, document.getElementById("Main"));
  }

  render() {
    return (
      <div className="App">
        <div className="Menu">
          <div onClick={this.renderNewHome} className="menu-item" title="Home">
            <i className="fa fa-home white-menu-icon"></i>
          </div>
          <hr/>
          <div onClick={this.renderNewSimon} className="menu-item" title="New Simon Game">
            <i className="fa fa-gamepad white-menu-icon"></i>
          </div>
          <hr/>
        </div>
        <div id="Main">
          <LandingPage/>
        </div>     
      </div>
    );
  }
}

export default App;
