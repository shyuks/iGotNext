import React, { Component } from 'react';
import Game from './game.js';
import axios from 'axios';


class Games extends Component {
  constructor(props){
    super(props)
    this.state = {
      games : []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    var self = this;
    axios.get('/getGames', { 
      params: {
        location : this.props.location, 
        sport : this.props.sport
      }
    })
    .then(results => {
      self.setState({
        games : results.data
      })
    })
  .catch(err => {
    console.log('Error getting games', err);
  })
  }
  
  render() {
    if (this.state.games.length === 0) {
      return (
        <div>Games Comings Soon</div>
      )
    } else {
      return (
        <div>
          {
           this.state.games.map((game, index) => {
           return <Game key={index} game={game}/>
          })
        }
        </div>
      )
    }
  }
}

export default Games;