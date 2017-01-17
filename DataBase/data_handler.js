var mongoose = require('mongoose');
var User = require('./users.js');
var Game = require('./games.js');
var Promise = require('bluebird');

Promise.promisifyAll(mongoose);
mongoose.Promise = require('bluebird');

exports.createUser = (inputUser, inputPass, cb) => {
  User.findOne({username : inputUser}).then(foundUser => {
    if(!foundUser){
      User.create({
        username : inputUser,
        password : inputPass
      }).then(createdUser => {
        cb(false, {created : true, id : createdUser._id, name:createdUser.username})
      }).catch(error => {
        console.log('in create error', error);
        cb(error)
      })
    } else {
      cb('User Already Exists!');
    }
  }).catch(error => {
    cb(error);
    console.log('error', error);
  });
}

exports.userLogin = (inputUser, inputPass, cb) => {
  User.findOne({username : inputUser})
  .then(foundUser => {
    if (foundUser) {
      User.comparePassword(inputPass, foundUser.password)
      .then(isMatch => {
        if (isMatch) {
          cb(false, {id:foundUser._id, name: foundUser.username});
        } else {
          cb('Invalid username/password combination');
        }
      })
      .catch(error => {
        cb(error);
      })
    }
  })
  .catch(error => {
    cb(error);
  })
}


exports.postEvent = (game, inputUser, cb) => {
    console.log(game.title);
  if (!inputUser) {
    cb('Session Timed Out');
  } else {
    User.find({_id : inputUser})
    .then(foundUser=>{
      console.log('found user in post event', foundUser);
        Game.create({
          title : game.title,
          description : game.description,
          address : game.address,
          city : game.city,
          state : game.state,
          zipcode : game.zipcode,
          sport : game.sport,
          user : foundUser._id
        })
        .then(game => {
          console.log('created game', game)
          cb(false, game);
        })
        .catch(error => {
          cb(err);
        })
    })
    .catch(err => {
      cb(err);
    })
  }
}

exports.getGames = (search, cb) => {
  if (search.location && search.sport){

  } else if (search.location) {

  } else if (search.sport) {

  } else {
    Game.find()
    .then(results => {
     // console.log('found data', results);
      cb(false, results);
    })
    .catch(error => {
      cb(error);
    })
  }
}
