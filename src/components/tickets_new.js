import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TicketsNew extends Component {

  constructor(props) {
    super(props);

    this.state = {
      subject: '',
      description: ''
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

    console.log(this.state)
  }

  render() {
    return(
      <div>
        <h2>New Ticket</h2>

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
