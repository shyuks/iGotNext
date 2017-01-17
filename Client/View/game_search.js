import React from 'react';

let GameSearch = ({handleSearch}) => {
  return (
    <div>
    <form id="user-sport-search" 
    onSubmit={(e)=>{e.preventDefault(); handleSearch(document.getElementById("sport-type").value, document.getElementById("location").value)}}>
      <label> Sport 
        <input id="sport-type" type="text"/>
      </label>
      <label> Location
        <input id="location" type="text"/>
      </label>
      <button type="submit">Find Games</button> 
    </form>
    </div>
  )
}

export default GameSearch;