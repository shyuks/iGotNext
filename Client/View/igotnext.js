import React, { Component } from 'react';
import axios from 'axios';
import UserLoginSignup from './login_signup.js';
import CreateGame from './create_game.js';
import Games from './games.js';
import UserSession from './user_session.js';
import GameSearch from './game_search.js';
import UserGames from './user_games.js';

class IGotNext extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId : null,
      userName : null,
      location : null,
      sport : null,
      login_signup_view : false,
      create_game_view: false,
      user_games_view: false,
      mounted : false
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleUserSeach = this.handleUserSeach.bind(this);
    this.handleUserSignupLogin = this.handleUserSignupLogin.bind(this);
    this.handleUserLogout = this.handleUserLogout.bind(this);
    this.handleCreateGameView = this.handleCreateGameView.bind(this);
    this.handleSignupLoginView = this.handleSignupLoginView.bind(this);
    this.handleUserGamesView = this.handleUserGamesView.bind(this);
  }

 componentWillMount(){
   axios.get('/checkSession')
   .then(res => {
     this.setState({
       userId : res.data.id,
       userName : res.data.name,
       mounted : true
     })
   })
   .catch(err => {
     console.log(err);
   })
 }

 handleUserSignupLogin(res){
   this.setState({
     userId : res.id,
     userName : res.name,
     login_signup_view  : !this.state.login_signup_view
   })
 }

 handleUserLogout(){
   var self = this;
   axios.post('/logout')
   .then(res => {
     self.setState({
       userId : null,
       userName : null
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
      login_signup_view : !this.state.login_signup_view
    })
  }

  handleUserGamesView(){
    this.setState({
      user_games_view : !this.state.user_games_view
    })
  }
  render() {
    if(this.state.mounted) {
      if (this.state.create_game_view) {
        return (
          <CreateGame 
            user={this.state.userId} 
            changeView={this.handleCreateGameView}/>
        )
      } else if (this.state.login_signup_view) {
        return (
          < UserLoginSignup 
          userSignupLogin={this.handleUserSignupLogin} 
          cancel={this.handleSignupLoginView}/> 
        )
      } else if (this.state.user_games_view) {
        return (
          < UserGames home={this.handleUserGamesView}/>
        )
      } else if (this.state.userId) {
        return (
          <div>
            <h3>Welcome back {this.state.userName}!</h3>
            < UserSession 
              user={this.state.userId} 
              logout={this.handleUserLogout} 
              loginSignup={null}
              createGame={this.handleCreateGameView}
              viewUserGames={this.handleUserGamesView}/>
            < GameSearch handleSearch={this.handleUserSeach} />
            < Games location={this.state.location} sport={this.state.sport} />
          </div>
        )
      } else {
        return (
          <div>
            <h3>Log in or create an account to post games!</h3>
            < UserSession 
            user={false} 
            logout={null} 
            loginSignup={this.handleSignupLoginView}
            createGame={null}
            viewUserGames={null}/>
            < GameSearch handleSearch={this.handleUserSeach} />
            < Games location={this.state.location} sport={this.state.sport} />
          </div>
          
        )
      }
    } else {
      return (
        <div>
        </div>
      )
    }
  }
}
export default IGotNext;