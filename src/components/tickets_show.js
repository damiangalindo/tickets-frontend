import React, { Component } from 'react';

class TicketsShow extends Component {
  render() {
    return(
      <div>
        <h2>Ticket</h2>

        <h3>ticketSubject</h3>
        <p>ticketMessage</p>
        <ul className='list-group'>
          <li>Response</li>
          <li>Reply</li>
        </ul>
      </div>
    )
  }
}

export default TicketsShow;
