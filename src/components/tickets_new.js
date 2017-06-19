import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../actions';
import BackToIndex from './back_to_index';

class TicketsNew extends Component {

  constructor(props) {
    super(props);

    this.state = {
      subject: '',
      description: '',
      auth_token: localStorage.getItem('auth_token')
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { subject, description, auth_token } = this.state;
    console.log(auth_token)
    axios.post(
      `${ BASE_URL }/tickets/create`,
      { subject: subject, message: description },
      {
        headers: {
          'Authorization': auth_token
        }
      }
    )
    .then((response) => {
      console.log(response.data)
      this.props.history.push('/tickets');
    })
  }

  render() {
    return(
      <div>
        <h2>New Ticket</h2>
        <BackToIndex />
        <div>
          <form onSubmit={ this.handleSubmit }>
            <div className='form-group'>
              <label>Subject</label>
              <input type='text' name='subject' className='form-control' value={ this.state.subject } onChange={ this.handleChange } />
            </div>
            <div className='form-group'>
              <label>Description</label>
              <textarea name='description' className='form-control' rows='3' value={ this.state.description } onChange={ this.handleChange } />
            </div>
            <div className='btn-group'>
              <Link className='btn btn-danger' to='/tickets'>Cancel</Link>
              <button className='btn btn-primary' type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default TicketsNew;
