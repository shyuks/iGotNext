import React, {Component} from 'react';
import axios from 'axios';

class CreateGame extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId : this.props.user,
      attempt : 0
    }
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
  }
  
  handleEventSubmit(event){
    event.preventDefault();
    
    var game = {
      title : document.getElementById("title").value,
      description : document.getElementById("description").value,
      sport : document.getElementById("sport").value,
      address : document.getElementById("street-address").value,
      city : document.getElementById("city").value,
      state : document.getElementById("state").value,
      zipcode : document.getElementById("zip").value
    };

    axios.post('/postEvent', game)
    .then(result => {
      if (result.data.created) {
        this.props.changeView();
      } else {
        this.setState({
          attempt : attempt++
        })
       }
    })
    .catch(err => {
      console.log('Error posting event', err);
    })
  }

  render(){
    return (
      <div>
        <h3>Enter game information</h3>
        <form id="user-game-input-form" onSubmit={this.handleEventSubmit}>
          <label> Title:
            <input id="title" type="text" required={true}/>
          </label>
          <label> Description:
            <input id="description" type="text"/>
          </label>
          <label> Sport:
            <input id="sport" type="text" required={true}/>
          </label>
          <label> Street Address:
            <input id="street-address" type="text" required={true}/>
          </label>
          <label> City:
            <input id="city" type="text" required={true}/>
          </label>
          <label> State:
            <input id="state" type="text" required={true}/>
          </label>
          <label> Zipcode:
            <input id="zip" type="text" required={true}/>
          </label>
          <button type="submit">Submit Game</button>
          <button onClick={(e)=>{e.preventDefault(); this.props.changeView()}}>Cancel</button>
        </form>
      </div>
    )
  }
}

export default CreateGame;