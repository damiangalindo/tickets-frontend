import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../actions';

class UserSignup extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      username: '',
      first_name: '',
      last_name: ''
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

    const { email, password, password_confirmation, username, first_name, last_name } = this.state;

    const request = axios.post(
            `${ BASE_URL }/users/register`,
            {
              email,
              password,
              password_confirmation,
              username,
              first_name,
              last_name
            }
          )
          .then((response) => {
            const { code, message } = response.data;
            const { authentication_token, user_type } = response.data;
            console.log(code)
            if (code === 201)
              this.props.history.push('/login');
            else {
              console.log(message)
            }
          })
          .catch((error) => {
            console.log(error)
          });
  }

  render() {
    return(
      <div>
        <h2>Signup</h2>
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
            <label>Password Confirmation</label>
            <input type='password' className='form-control' name='password_confirmation' onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label>Username</label>
            <input type='text' className='form-control' name='username' onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label>First Name</label>
            <input type='text' className='form-control' name='first_name' onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label>Last Name</label>
            <input type='text' className='form-control' name='last_name' onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>Signup</button>
            or
            <Link to='/login'>Login</Link>
          </div>
        </form>
      </div>
    )
  }
}

export default UserSignup;
