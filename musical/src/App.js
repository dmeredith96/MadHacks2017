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
          <Menu>
            <a onClick={ this.renderNewHome }>Home</a>
            <a onClick={ this.renderNewSimon }>Simon</a>
          </Menu>
        </div>
        <div id="Main">
          <LandingPage/>
        </div>     
      </div>
    );
  }
}

export default App;
