
const express = require('express')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();
const port = 3000;
const DataBase = require('./data-base/dataBase.js');
const dataBase = new DataBase();

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware
app.use(cookieParser());

// a variable to save a session
var session;

//create session
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.get('/',(req,res) => {
  session=req.session;
  if(session.userid){
      res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  }else{
    res.sendFile('views/index.html',{root:__dirname})
  }
});

app.post('/user',(req,res) => {
  //logins in user and checks if user exists
  let username = req.body.username;
  let password = req.body.password;
  if(dataBase.ifUserExist(username, password)){
    session = req.session;
    session.userid=req.body.username;
    session.cards;
    res.sendFile('views/homepage-logged-in.html',{root:__dirname})
  }
  else{
      res.send('Invalid username or password');
  }
})

app.post('/action', (req,res) => {
  console.log(req.session.userid)
  res.sendFile('views/homepage-logged-in.html',{root:__dirname});
})

app.get('/sessions', (req, res) => {
  req.sessionStore.sessionModel.findAll()
    .then(sessions => sessions.map(sess => JSON.parse(sess.dataValues.data)))
    .then((sessions) => {
      res.send(sessions)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})