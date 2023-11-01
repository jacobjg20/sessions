// Get data for Current table, meaning it can be data for server Jammy or Dirtcup
var communityCards;
var tableName;
var players;
var hand;

function getCurrentTableState(){
  fetch("/getCurrentTableState", {
        method: "POST",
      })
      .then((response) => { return response.json() })
      .then((response) => {
        communityCards = response.communityCards;
        tableName = response.tableName;
        players = JSON.stringify(response.players);
        hand = JSON.stringify(response.hand);
      })
      .then(displayGameState());
}

function displayGameState(){
  document.getElementById('board').innerHTML = '';
  document.getElementById('board').innerHTML += communityCards + "<br>" + tableName + "<br>" + players + "<br>" + hand;
}

function shuffleCards(){
  fetch("/shuffleCards", {
        method: "POST",
      });
}
