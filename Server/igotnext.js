var express = require('express');
var path = require('path');
var parser = require('body-parser');
var session = require('express-session');
var dataHandler = require('../DataBase/data_handler.js');

//routers
//var router = require('./routes.js');

var app = express();
module.exports.app = app;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));

app.use(session({
  secret : "This is a secret",
  resave: false,
  saveUninitialized: true
}));

app.get('/checkSession', (req, res) => {
  res.send(req.session.user);
});

app.post('/signup', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  
  dataHandler.createUser(username, password, (err, result) => {
    if(err === 'User Already Exists!'){
      console.log(err);
      res.status(200).json(err);
    } else if (err) {
      res.status(500).send(err);
    }else {
      req.session.user = result.id;
      res.status(200).json(result);
    }
  });
});

app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  dataHandler.userLogin(username, password, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      req.session.user = result;
      res.status(200).json(result);
    }
  })

})

app.post('/logout', (req, res) => {
    req.session.destroy()
    res.status(200).send('Logout Successful');
})


app.post('/postEvent', (req, res) => {
  dataHandler.postEvent(req.body, req.session.user, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({created : false, error : err});
    } else {
      console.log('Posted Event Succesfully', result);
      res.status(200).json({created : true});
    }
  })
})

app.get('/getGames', (req, res) => {
  dataHandler.getGames (req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json([]);
    } else { 
      res.status(200).json(result);
    }
  })
})



app.listen(3000, ()=>{
  console.log('App listening on port 3000');
})

