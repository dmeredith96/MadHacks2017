import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Simon from './Simon';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name || 'Robert'
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Hello {this.state.name}</p>
        <Simon roomId='hello' />
        <Simon roomId='world' />        
      </div>
    );
  }
}

export default App;
