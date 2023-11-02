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

function playerData(players){
  let player = players.find(item => item.userid === userid);

  return player;
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
      this.resetHands();
      this.currentPlayer = this.players[this.turn].userid;
      console.log('It is ' + this.currentPlayer + " turn.")
    }

    getCurrentTableState(userid){
      let player = this.players.find(item => item.userid === userid);

      return {
        communityCards: null,
        tableName: this.tableName,
        players: this.playerUsernames(),
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

    resetHands(){
      for(let i = 0; i < this.players.length; i++){
        this.players[i].hand = [];
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

    //Current players
    isCurrentPlayer(userid){
      if(userid == this.currentPlayer){
        return true;
      }else {
        return false;
      }
    }

    playerUsernames(){
      let players = [];

      for(let i = 0; i < this.players.length; i++){
        players.push(this.players[i].userid);
      }

      return players;
    }
    //player actions
    check(userid){
      if(userid == currentPlayer){
        this.turn++;
        this.currentPlayer = this.players[turn].userid;
        console.log(currentPlayer);
      }else {
        console.log('user is acting out of turn');
      }
    }

    raise(userid){

    }

    fold(userid){
      if(userid == currentPlayer){

      }else{
        console.log('user is acting out of turn');
      }
    }

}

module.exports = Table;
