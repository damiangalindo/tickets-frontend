import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

// Components
import TicketsIndex from './components/tickets_index';
import TicketsNew from './components/tickets_new';
import TicketsRespond from './components/tickets_respond';
import TicketsReport from './components/tickets_report';
import UserLogin from './components/user_login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Support Tickets System</h2>
        </div>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={ UserLogin } />
            <Route path='/tickets/new' component={ TicketsNew }/>
            <Route path='/tickets/respond' component={ TicketsRespond }/>
            <Route path='/tickets/report' component={ TicketsReport }/>
            <Route path='/tickets' component={ TicketsIndex } />
            <Route path='/' />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
