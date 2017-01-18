import React, { Component } from 'react';
import axios from 'axios';

class UserLoginSignup extends Component {
  constructor(props){
    super(props)
    this.state = {
      attempt : 0
    }
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleUserSignup = this.handleUserSignup.bind(this);
  }

  handleUserLogin(event){

    event.preventDefault();

    var userInfo = {
      username : document.getElementById("login-username-input").value,
      password : document.getElementById("login-password-input").value
    }

    axios.post('/login', userInfo)
    .then(result => {
      if (result) {
        this.props.userSignupLogin(result.data);
      } else {
        console.log('Incorrect Username or Password');
        this.setState({
          attempt : ++this.state.attempt
        })
      }
    })
    .catch(err => {
      console.log('Error Loging in', err);
    })
  }

  handleUserSignup(event){
    var self = this;
    event.preventDefault();

    var userInfo = {
      username : document.getElementById("signup-username-input").value,
      password : document.getElementById("signup-password-input").value
    }

    axios.post('/signup', userInfo)
    .then(result => {
      if (result.data.created) {
        self.props.userSignupLogin(result.data);
      } else {
        console.log('User already Taken', this.state.attempt);
        self.setState({
          attempt : ++this.state.attempt
        })
      } 
    })
    .catch(err => {
      console.log('Caught error in signup', err);
    })
  }

  render(){
    return (
      <div>
        <h3>Login</h3>
        <form id="user-login" onSubmit={this.handleUserLogin}>
          <label>Username
            <input id="login-username-input"/>
          </label>
          <label>Password
            <input id="login-password-input"/>
          </label>
          <button type="submit">Enter</button>
        </form>

        <h3>Signup</h3>
        <form id="user-signup" onSubmit={this.handleUserSignup}>
          <label>Username
            <input id="signup-username-input"/>
          </label>
          <label>Password
            <input id="signup-password-input"/>
          </label>
          <button type="submit">Enter</button>
        </form>

        <button onClick={()=>this.props.cancel()}>Cancel</button>
      </div>
    )
  }
}

export default UserLoginSignup;
