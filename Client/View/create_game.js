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
    console.log('clicked');
    
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
        <form id="user-game-input-form" onSubmit={this.handleEventSubmit}>
          <label> Title:
            <input id="title" type="text"/>
          </label>
          <label> Description:
            <textarea id="description" type="text"/>
          </label>
          <label> Sport:
            <textarea id="sport" type="text"/>
          </label>
          <label> Street Address:
            <input id="street-address" type="text"/>
          </label>
          <label> City:
            <input id="city" type="text"/>
          </label>
          <label> State:
            <input id="state" type="text"/>
          </label>
          <label> Zipcode:
            <input id="zip" type="text"/>
          </label>
          <button type="submit">Submit Game</button>
          <button onClick={()=>this.props.changeView()}>Cancel</button>
        </form>
      </div>
    )
  }
}

export default CreateGame;