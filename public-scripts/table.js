// Get data for Current table, meaning it can be data for server Jammy or Dirtcup
var communityCards = 'community cards';
var tableName;
var players;
var hand;
var chips;

function getCurrentTableState(){
  fetch("/getCurrentTableState", {
        method: "POST",
      })
      .then((response) => { return response.json() })
      .then((response) => {
        communityCards = JSON.stringify(response.communityCards);
        tableName = response.tableName;
        players = JSON.stringify(response.players);
        hand = JSON.stringify(response.hand);
        chips = response.chips;
      })
      .then(displayGameState());
}

function displayGameState(){
  document.getElementById('board').innerHTML = '';
  document.getElementById('board').innerHTML += communityCards + "<br>" + tableName + "<br>" + players + "<br>" + hand + "<br> Chips:" + chips;
}

function startRound(){
  fetch("/startRound", {
        method: "POST",
      });
}

function check(){
  fetch("/check", {
        method: "POST",
      });
}
