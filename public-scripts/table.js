// Get data for Current table, meaning it can be data for server Jammy or Dirtcup
var communityCards;
var tableName;
var players;

function getCurrentTableState(){
  fetch("/getCurrentTableState", {
        method: "POST",
      })
      .then((response) => { return response.json() })
      .then((response) => {
        communityCards = response.deck;
      });

      displayGameState();
}

function displayGameState(){
  
}

function shuffleCards(){
  fetch("/shuffleCards", {
        method: "POST",
      });
}
