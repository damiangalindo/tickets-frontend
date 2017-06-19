import React, { Component } from 'react';
import './App.css';

// Components
import Routes from './components/routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Support Tickets System</h2>
        </div>
        <Routes />
      </div>
    );
  }
}

export default App;
