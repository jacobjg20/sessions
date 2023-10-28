
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

//create session
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

//Get Requests

app.get('/',(req,res) => {
  let session=req.session;
  if(session.userid){
      res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  }else{
    res.sendFile('views/index.html',{root:__dirname})
  }
});


//logins in user and checks if user exists
app.post('/user',(req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  if(dataBase.ifUserExist(username, password)){
    let session = req.session;
    session.userid=req.body.username;
    session.cards;
    res.sendFile('views/main-menu.html',{root:__dirname})
  }
  else{
      res.send('Invalid username or password');
  }
})

//Post Requests

app.post('/action', (req,res) => {
  console.log(req.session.server);

  res.sendFile('views/main-menu.html',{root:__dirname});
})

app.post('/getTables', (req, res) => {
  res.send(dataBase.getTables());
})

//Server Routes

app.post('/joinServerJammy', (req, res) => {
  let session = req.session;
  session.server = 'Jammy'
  res.sendFile('views/table.html', {root:__dirname});
})

app.post('/joinServerDirtcup', (req, res) => {
  let session = req.session;
  session.server = 'Dirtcup';
  res.sendFile('views/table.html', {root:__dirname});
})

//node server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}` + __dirname);
})
