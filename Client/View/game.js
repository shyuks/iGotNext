import React from 'react';

let Game = ({game, index, handleDelete}) => {

  if (handleDelete) {
    return (
       <div className="container">
        <h3>{game.title}</h3>
        <p>{game.description}</p>
        <div>Address
          <p>{game.address}</p>
          <p>{game.city}</p>
          <p>{game.state}</p>
          <p>{game.zip}</p>
        </div>
        <h4>{game.sport}</h4>
        <button onClick={()=>handleDelete(game._id, index)}>Delete Game</button>
      </div>
    )
  } else {
      return (
          <div className="container">
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <div>Address
              <p>{game.address}</p>
              <p>{game.city}</p>
              <p>{game.state}</p>
              <p>{game.zip}</p>
            </div>
            <h4>{game.sport}</h4>
          </div>
        )
  }
}

export default Game;