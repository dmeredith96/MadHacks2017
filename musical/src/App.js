import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {slide as Menu} from 'react-burger-menu';

class App extends Component {

  showSettings(event) {

  }

  render() {
    return (
      <div className="App">
        <Menu>
          <div className="menu-item">Home</div>
          <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
        </Menu>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
