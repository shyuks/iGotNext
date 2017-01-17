import React, { Component } from 'react';

// class UserSession extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       userId : this.props.user
//     }
//     this.handleLoginSignupClick = this.handleLoginSignupClick.bind(this);
//   }

// handleLoginSignupClick(){
//   this.props.loginSignup();
// }
//   render(){
//     console.log("user from session render", this.props.user)
//     if (this.props.user) {
//       return (
//         <div>
//           <button id="logout" onClick={()=>this.props.logout()}>Logout</button>
//           <button id="create-game" onClick={()=>this.props.createGame()}>Create Game</button>
//         </div>
//       )
//     } else {
//       return (
//         <div>
//           <button id="login_signup" onClick={()=>this.handleLoginSignupClick()}>Login/Signup</button>
//         </div>
//       )
//     }
//   }
// }

let UserSession = ({user, logout, loginSignup, createGame}) => {
  if (user) {
     return (
        <div>
          <button id="logout" onClick={()=>logout()}>Logout</button>
          <button id="create-game" onClick={()=>createGame()}>Create Game</button>
        </div>
      )
  } else {
      return (
        <div>
          <button id="login_signup" onClick={()=>loginSignup()}>Login/Signup</button>
        </div>
      )
  }
}

export default UserSession;