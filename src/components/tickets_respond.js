import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TicketsRespond extends Component {

  constructor(props) {
    super(props);

    this.state = {
      response: ''
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

    console.log(this.state);
  }

  render(){
    return(
      <div>
        <h2>Respond Ticket</h2>
        <form onSubmit={ this.handleSubmit }>
          <div className='form-group'>
            <textarea name='response' onChange={ this.handleChange } rows='3'></textarea>
          </div>
          <div className='btn-group'>
            <Link className='btn btn-danger' to='/tickets'>Cancel</Link>
            <button className='btn btn-primary' type='submit'>Submit</button>
          </div>
          <Link to='/' className='btn btn-danger'>Close Ticket</Link>
        </form>
      </div>
    )
  }

}

export default TicketsRespond;
