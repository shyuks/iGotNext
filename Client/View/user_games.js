import React,  { Component } from 'react';
import axios from 'axios';
import Game from './game.js';

class UserGames extends Component {
  constructor(props){
    super(props)
    this.state = {
      userId : false,
      games : []
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleGameDeletion = this.handleGameDeletion.bind(this);
  }

  componentWillMount() {
    axios.get('/userGames')
   .then(res => {
     this.setState({
       userId : res.data.id,
       games : res.data.games
     })
   })
   .catch(err => {
     console.log(err);
   })
  }

  handleGameDeletion(gameId, index){

    axios.post('/deleteGame', {game : gameId})
    .then(()=> {
      this.state.games.splice(index, 1);
      this.setState({
        games : this.state.games
      })
    })
    .catch(error => {
      console.log('Error deleting game', error);
    })

  }

  render() {
    if (this.state.userId) {
      return (
        <div>
         <h3>My Games</h3>
        <button onClick={()=> this.props.home()}>Home</button>
        <div>{
          this.state.games.map((eachGame, idx)=>{
            return <Game 
                    game={eachGame} 
                    key={eachGame._id}
                    index = {idx}
                    handleDelete={this.handleGameDeletion}/>
          })
        }
        </div>
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }
}

export default UserGames;