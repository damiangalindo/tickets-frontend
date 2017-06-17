import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TicketsIndex extends Component {

  render(){
    return(
      <div>
        <h2>Tickets</h2>
        <Link to='/tickets/new'>New Ticket</Link>
        <Link to='/tickets/respond'>Respond Ticket</Link>
        <Link to='/tickets/report'>Tickets Report</Link>
      </div>
    )
  }

}

export default TicketsIndex;
