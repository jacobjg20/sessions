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


      this.round = 0;
      this.turn = 0;
      this.currentPlayer;
    }

    startRound(){
      this.rounds = this.players.length;
      this.currentPlayer = this.players[this.turn].userid;
    }

    getCurrentTableState(userid){
      let player = this.players.find(item => item.userid === userid);

      return {
        communityCards: null,
        tableName: this.tableName,
        players: this.players,
        hand: player.hand,
        chips: player.chips
      };
    }

    addPlayer(userid){
      let userInfo = {
        userid: userid,
        hand: [],
        chips: 100,
        isTurn: false
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

        this.players[i].hand.push(this.cards[currentCard]);
        this.players[i].hand.push(this.cards[++currentCard]);
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

    isCurrentPlayer(userid){
      if(userid == this.currentPlayer){
        return true;
      }else {
        return false;
      }
    }


    //player actions
    check(){}
    raise(){}
    fold(){}

}

module.exports = Table;
