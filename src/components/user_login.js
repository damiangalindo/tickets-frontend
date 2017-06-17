import React, { Component } from 'react';

class UserLogin extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
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

    console.log(this.state);
  }

  render() {
    return(
      <div>
        <h2>Login</h2>
        <form onSubmit={ this.handleSubmit }>
          <div className='form-group'>
            <label>Username</label>
            <input type='text' name='username' onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type='password' name='password' onChange={ this.handleChange } />
          </div>
          <div className='btn-group'>
            <button type='submit' className='btn btn-primary'>Login</button>
          </div>
        </form>
      </div>
    )
  }
}

export default UserLogin;
