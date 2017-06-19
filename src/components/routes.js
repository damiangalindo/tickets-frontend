import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Components
import TicketsIndex from './tickets_index';
import TicketsNew from './tickets_new';
import TicketsRespond from './tickets_respond';
import TicketsReport from './tickets_report';
import UserLogin from './user_login';
import UserSignup from './user_signup';

class Routes extends Component {
  render () {
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={ UserLogin } />
          <Route path='/signup' component={ UserSignup } />
          <Route path='/tickets/new' component={ TicketsNew } />
          <Route path='/tickets/respond/:id' component={ TicketsRespond } />
          <Route path='/tickets/report' component={ TicketsReport } />
          <Route path='/tickets' component={ TicketsIndex } />
          <Redirect from='/' to='/login' />
        </Switch>
      </BrowserRouter>
    )
  }

}

export default Routes;
