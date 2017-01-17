var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var db = require('./db.config.js');


var userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
    index : {unique : true}
  }, 
  password : {
    type : String,
    required : true
  }
});

var User = db.model('User', userSchema);

User.comparePassword = (enteredPassword, savedPassword) => {
  return new Promise ((resolve, reject)=>{
    return bcrypt.compare(enteredPassword, savedPassword, (err, isMatch)=>{
      if (err) {
        return reject(err);
      } else {
        return resolve(isMatch);
      }
    })
  })
};

userSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null)
  .then((hash)=>{
    this.password = hash;
    next();
  })
})

module.exports = User;

