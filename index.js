
const express = require('express')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();
const port = 3000;
const DataBase = require('./data-base/dataBase.js');
const dataBase = new DataBase();
const Table = new require('./data-base/table.js');
tableJammy = new Table('Jammy');
tableDirtCup = new Table('DirtCup');

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

//joins server, adds userid, adds session
app.get('/jammy', (req, res) =>{
  let session=req.session;
  let userid=req.session.userid;

  session.server = "jammy";
  tableJammy.addPlayer(userid);
  res.sendFile('views/table.html', {root:__dirname});
})

//joins server, adds userid, adds session
app.get('/dirtCup', (req, res) =>{
  let session=req.session;
  let userid=req.session.userid;

  session.server = "dirtCup";
  tableDirtCup.addPlayer(userid);
  res.sendFile('views/table.html', {root:__dirname});
})

//Post Requests From Main menu
app.post('/main-menu',(req,res) => {
  let username = req.body.username;
  let password = req.body.password;

  if(dataBase.ifUserExist(username, password)){
    let session = req.session;
    session.userid=req.body.username;
    res.sendFile('views/main-menu.html',{root:__dirname})
  }
  else{
    res.send('Invalid username or password');
  }

})

//POST REQUEST FOR TABLES
app.post('/startRound', (req, res) => {
  let server = req.session.server;

  if(server == 'dirtCup'){
    tableDirtCup.startRound();
    tableDirtCup.shuffleCards();
    tableDirtCup.assignHands();
    res.end();
  }
  else if(server == 'jammy'){
    tableJammy.startRound();
    tableJammy.shuffleCards();
    tableJammy.assignHands();
    res.end();
  }

  res.end();
})

app.post('/getCurrentTableState', (req, res) =>{
  let server = req.session.server;
  let userid = req.session.userid;
  if(server == 'dirtCup'){
    res.send(tableDirtCup.getCurrentTableState(userid));
  }
  else if(server == 'jammy'){
    res.send(tableJammy.getCurrentTableState(userid));
  }

  res.end();
})

//node server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}` + __dirname);
})
