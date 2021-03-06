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
  secret : "allGames",
  resave: false,
  saveUninitialized: true
}));

app.get('/checkSession', (req, res) => {
  res.send({id : req.session.user, name: req.session.userName});
});

app.post('/signup', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  
  dataHandler.createUser(username, password, (err, result) => {
    if (result.created) {
        req.session.user = result.id;
        req.session.userName = result.name;
        res.status(200).json(result);
    } else if (err === 'User Already Exists!') {
      console.log(err);
      res.status(200).json(err);
    } else {
      res.status(500).send(err);
    }
  });
});

app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  dataHandler.userLogin(username, password, (err, result) => {
    console.log(result)
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      req.session.user = result.id;
      req.session.userName = result.name;
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

app.get('/userGames', (req, res) => {
  dataHandler.getUserGames(req.session.user, (err, result)=>{
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  })
})

app.post('/deleteGame', (req, res)=>{
  console.log('entered server delte game')
  dataHandler.deleteGame(req.session.user, req.body.game, (error, result)=>{
    console.log('entered server delete game call back');
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(result);
    }
  })
})


app.listen(3000, ()=>{
  console.log('App listening on port 3000');
})

