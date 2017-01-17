import React, { Component } from 'react';

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