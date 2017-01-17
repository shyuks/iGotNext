var mongoose = require('mongoose');

mongoURI = 'mongodb://rnesh90:HRLA12testing@ds111529.mlab.com:11529/igotnext';
mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Mongodb connection open');
});

module.exports = db;