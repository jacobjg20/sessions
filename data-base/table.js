const Deck = require('./deck.js');
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
      this.cards = deck.getCards();
      this.communityCards = [];
    }

    getCurrentTableState(userid){
      let hand = this.players.find(item => item.userid === userid);
      console.log(this.playersHands); //REMOVE LATER
      return {
        communityCards: null,
        tableName: this.tableName,
        players: this.players,
        hand: hand
      };
    }

    addPlayer(userid){
      let userInfo = {
        userid: userid,
        hand: null,
        chips: 0
      }

      if(!useridExist(userid,this.players)){
        this.players.push(userInfo);
      } else{
        console.log('player already in lobby'); // REMOVE LATER
      }
    }

    assignHands(){
      let currentCard = 0;

      for(let i = 0; i < this.players.length; i++){

        this.players[i].firstCard =  this.cards[currentCard];
        this.players[i].secondCard = this.cards[++currentCard];
        currentCard += 2;
      }
    }

    shuffleCards(){
      let cardsCount = this.cards.length;

        for (var i = cardsCount - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
}

module.exports = Table;
