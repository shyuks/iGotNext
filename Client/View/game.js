import React from 'react';

let Game = ({game}) => {
  return (
    <div>
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

export default Game;