var mongoose = require ('mongoose');
var db = require ('./db.config.js');

var gameSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  }, 
  description : {
    type : String,
    required : true
  }, 
  address : {
    type : String,
    required : true
  }, 
  city : {
    type : String,
    required : true
  }, 
  state : {
    type : String,
    required : true
  }, 
  zipcode : {
    type : Number,
    required : true
  },
  sport : {
    type : String,
    required : true
  },
  userId : {
    type : String,
    required : true}
})

var Game = db.model('Game', gameSchema);

module.exports = Game;