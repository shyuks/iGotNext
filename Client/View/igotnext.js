import React, { Component } from 'react';
import axios from 'axios';
import UserLoginSignup from './login_signup.js';
import CreateGame from './create_game.js';
import Games from './games.js';
import UserSession from './user_session.js';
import GameSearch from './game_search.js';

class IGotNext extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId : null,
      location : null,
      sport : null,
      login_signup_view : false,
      create_game_view: false
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleUserSeach = this.handleUserSeach.bind(this);
    this.handleUserSignupLogin = this.handleUserSignupLogin.bind(this);
    this.handleUserLogout = this.handleUserLogout.bind(this);
    this.handleCreateGameView = this.handleCreateGameView.bind(this);
    this.handleSignupLoginView = this.handleSignupLoginView.bind(this);
  }

 componentDidMount(){
   axios.get('/checkSession')
   .then(res => {
     this.setState({
       userId : res.data
     })
   })
   .catch(err => {
     console.log(err);
   })
 }

 handleUserSignupLogin(inputID){
   this.setState({
     userId : inputID,
     login_signup_view  : false
   })
 }

 handleUserLogout(){
   var self = this;
   axios.post('/logout')
   .then(res => {
     self.setState({
       userId : null
     })
   })
   .catch(err => {
     console.log(err);
   })
 }

  handleUserSeach(address, inputSport){
    this.setState({
      location : address,
      sport : inputSport
    })
  }

  handleCreateGameView(){
    this.setState({
      create_game_view : !this.state.create_game_view
    })
  }

  handleSignupLoginView(){
    this.setState({
      login_signup_view : true
    })
  }

  render() {
    if (this.state.create_game_view) {
      return (
        <CreateGame 
          user={this.state.userId} 
          changeView={this.handleCreateGameView}/>
      )
    } else if (this.state.login_signup_view) {
      return (
        < UserLoginSignup 
        userSignupLogin={this.handleUserSignupLogin}/> 
      )
    } else if (this.state.userId) {
      return (
        <div>
          < UserSession 
            user={this.state.userId} 
            logout={this.handleUserLogout} 
            loginSignup={null}
            createGame={this.handleCreateGameView}/>
          < GameSearch handleSearch={this.handleUserSeach} />
          < Games location={this.state.location} sport={this.state.sport} />
        </div>
      )
    } else {
      return (
        <div>
          < UserSession 
          user={false} 
          logout={null} 
          loginSignup={this.handleSignupLoginView}
          createGame={null}/>
          < GameSearch handleSearch={this.handleUserSeach} />
          < Games location={this.state.location} sport={this.state.sport} />
        </div>
      )
    }
  }
}
export default IGotNext;