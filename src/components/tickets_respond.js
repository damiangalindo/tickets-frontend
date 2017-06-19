import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { BASE_URL } from '../actions';
import BackToIndex from './back_to_index';

class TicketsRespond extends Component {

  constructor(props) {
    super(props);

    this.state = {
      response: '',
      responses: [],
      ticket_id: '',
      ticket: {},
      auth_token: localStorage.getItem('auth_token')
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeTicket = this.closeTicket.bind(this);
  }

  fetchTicket(id) {
    axios.get(
      `${ BASE_URL }/tickets/${ id }/show`,
      {
        headers: {
          'Authorization': this.state.auth_token
        }
      }
    )
    .then((response) => {
      const ticket = response.data;

      this.setState({ ticket });
      this.setState({ ticket_id: ticket.id });
    })
  }

  fetchTicketReponses(ticket_id) {
    axios.get(
      `${ BASE_URL }/responses/${ ticket_id }/`,
      {
        headers: {
          'Authorization': this.state.auth_token
        }
      }
    )
    .then((response) => {
      const { responses } = response.data;

      this.setState({ responses });
    })
  }

  submitTicket(response) {
    const { ticket_id, auth_token } = this.state;
    console.log(this.state)
    axios.post(
      `${ BASE_URL }/responses/${ ticket_id }/create`,
      { response: response },
      {
        headers: {
          'Authorization': auth_token
        }
      }
    ).then((response) => {
      const reponse = response.data;
      const { responses } = this.state;

      this.setState({ responses: _.concat(responses, reponse) });
    })
  }

  closeTicket() {
    const { ticket_id, auth_token } = this.state;
    console.log(this.state)
    axios.put(
      `${ BASE_URL }/tickets/${ ticket_id }/close`,
      {},
      {
        headers: {
          'Authorization': auth_token
        }
      }
    ).then((response) => {
      const ticket = response.data;
      this.setState({ ticket });
    })
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { response } = this.state;

    this.submitTicket(response);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchTicket(id);
    this.fetchTicketReponses(id);
  }

  renderTicket() {
    const { ticket } = this.state;

    if (_.isEmpty(ticket)){
      return(<div>Loading...</div>);
    }else{
      return(
        <div>
          { this.renderCloseButton() }
          <h3>{ ticket.subject } { this.renderStateLabel() }</h3>
          <div>{ ticket.message }</div>
        </div>
      )
    }
  }

  renderCloseButton() {
    const role = localStorage.getItem('role');
    const { ticket } = this.state;

    if (!_.isEmpty(ticket)){
      if(role !== 'customer' && ticket.state === 'open'){
        return(
          <div>
            <a className='btn btn-danger' onClick={ this.closeTicket }>Close Ticket</a>
          </div>
        )
      }
    }
  }

  renderTicketForm() {
    const { ticket } = this.state;

    if (!_.isEmpty(ticket)){
      if(ticket.state === 'open'){
        return(
          <form onSubmit={ this.handleSubmit }>
            <div className='form-group'>
              <textarea name='response' className='form-control' onChange={ this.handleChange } rows='3'></textarea>
            </div>
            <div className='btn-group'>
              <Link className='btn btn-danger' to='/tickets'>Cancel</Link>
              <button className='btn btn-primary' type='submit'>Submit</button>
            </div>
          </form>
        )
      }
    }
  }

  renderStateLabel() {
    const { ticket } = this.state;

    if (!_.isEmpty(ticket)){
      const className = ticket.state === 'open' ? 'success' : 'danger';

      return(
        <div><span className={ `label label-${ className }` }>{ ticket.state }</span></div>
      )
    }
  }

  renderResponses() {
    const { responses } = this.state;

    return _.map(responses, response => {
      return(
        <li key={ response.id } className='list-group-item'>
          { response.username }
          { response.response }
        </li>
      )
    })
  }

  render(){
    return(
      <div>
        <h2>Respond Ticket</h2>
        <BackToIndex />
        { this.renderTicket() }
        <div>
          <h4>Ticket Responses</h4>
          <ul className='list-group'>
            { this.renderResponses() }
          </ul>
        </div>
        { this.renderTicketForm() }
      </div>
    )
  }

}

export default TicketsRespond;
