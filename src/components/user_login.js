import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../actions';

class UserLogin extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
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

    const { email, password } = this.state;

    axios.post(
      `${ BASE_URL }/users/login`,
      { email: email, password: password }
    )
    .then((response) => {
      const { authentication_token, user_type } = response.data;
      localStorage.setItem('auth_token', authentication_token);
      localStorage.setItem('role', user_type);
      this.props.history.push('/tickets');
    });
  }

  render() {
    return(
      <div>
        <h2>Login</h2>
        <form onSubmit={ this.handleSubmit }>
          <div className='form-group'>
            <label>Email</label>
            <input type='text' className='form-control' name='email' onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type='password' className='form-control' name='password' onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>Login</button>
            or
            <Link to='/signup'>Register</Link>
          </div>
        </form>
      </div>
    )
  }
}

export default UserLogin;
