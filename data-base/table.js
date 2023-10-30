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
      this.playersHands = [];
      this.cards = deck.getCards();
      this.communityCards = [];
    }

    getCurrentTableState(userid){
      let hand = this.playersHands.find(item => item.userid === userid);
      console.log(this.playersHands);
      return {
        communityCards: null,
        tableName: this.tableName,
        players: this.players,
        hand: hand
      };
    }

    addPlayer(userid){
      if(!useridExist(userid,this.players)){
        this.players.push(userid);
      } else{
        console.log('player already in lobby'); // REMOVE LATER
      }
    }

    assignHands(){
      let currentCard = 0;
      this.playersHands = [];

      for(let i = 0; i < this.players.length; i++){
        let playerHand = {
          userid: this.players[i],
          firstCard: this.cards[currentCard],
          secondCard: this.cards[++currentCard]
        }

        this.playersHands.push(playerHand);
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
