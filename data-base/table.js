const Deck = require('./Deck.js');
const deck = new Deck();

function useridExist(userid , players){
  let playerCount = players.length;

  for(let i = 0; i < playerCount; i++){
    let playerUserName = players[i];

    if(userid == playerUserName){
      return true;
    }
  }
  return false;
}

class Table{
    constructor(tableName){
      this.tableName = tableName;
      this.players = [];
      this.playerCount = 0;
      this.deck = deck;
      this.communityCards = [];
    }

    getCurrentTableState(){
      return {
        tableName: this.tableName,
        players: this.players,
        deck: this.deck.getCards()
      };
    }

    addPlayer(userid){
      if(!useridExist(userid,this.players)){
        this.players.push(userid);
      } else{
        console.log('player already in lobby'); // REMOVE LATER
      }
      this.playerCount++;
    }

    shuffleCards(){
      this.deck.shuffleCards();
    }
}

module.exports = Table;
