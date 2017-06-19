import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { BASE_URL } from '../actions';

class TicketsIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tickets: [],
      auth_token: localStorage.getItem('auth_token')
    }
  }

  componentDidMount() {
    console.log(this.state.auth_token)
    axios.get(
      `${ BASE_URL }/tickets/all`,
      {
        headers: {
          'Authorization': this.state.auth_token
        }
      }
    ).then((response) => {
      const { tickets } = response.data;
      this.setState({ tickets });
    })
  }

  renderTickets() {
    const { tickets } = this.state;

    console.log(tickets)

    return _.map(tickets, ticket => {
      return(
        <li key={ ticket.id } className='list-group-item' onClick={ this.respondTicket }>
          <p><Link to={ `/tickets/respond/${ ticket.id }` }>{ ticket.subject }</Link></p>
          { this.renderStateLabel(ticket) }
        </li>
      )
    })
  }

  renderStateLabel(ticket) {
    if (!_.isEmpty(ticket)){
      const className = ticket.state === 'open' ? 'success' : 'danger';

      return(
        <div><span className={ `label label-${ className }` }>{ ticket.state }</span></div>
      )
    }
  }

  render(){
    return(
      <div>
        <h2>Tickets</h2>
        <Link to='/tickets/new'>New Ticket</Link>
        <Link to='/tickets/report'>Tickets Report</Link>
        <div>
          <ul className='list-group'>
            { this.renderTickets() }
          </ul>
        </div>
      </div>
    )
  }

}

export default TicketsIndex;
