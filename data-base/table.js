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
      this.currentCard;
      this.communityCards = [];

      this.round = 0;
      this.turn = 0;
      this.currentPlayer;
      this.gameInProgress = false;
    }

    startRound(){
      if(!(this.gameInProgress)){
        this.resetHands();
        this.currentPlayer = this.players[this.turn].userid;
        this.shuffleCards();
        this.assignHands();
        this.gameInProgress = true;
        console.log('It is ' + this.currentPlayer + " turn.")
      }

      else if(this.gameInProgress){ console.log('Cannot start round, game in progress.') };
    }

    getCurrentTableState(userid){
      let player = this.players.find(item => item.userid === userid);

      return {
        communityCards: null,
        tableName: this.tableName,
        players: this.playerUsernames(),
        hand: player.hand,
        chips: player.chips,
        communityCards: this.communityCards
      };
    }

    assignHands(){
      this.currentCard = 0;

      for(let i = 0; i < this.players.length; i++){
        this.players[i].hand.push(this.cards[this.currentCard]);
        this.players[i].hand.push(this.cards[++this.currentCard]);
        this.currentCard += 2;
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

    addCommunityCards(){
      if(this.round == 0){
        this.communityCards.push(this.cards[this.currentCard]);
        this.communityCards.push(this.cards[1 + this.currentCard]);
        this.communityCards.push(this.cards[2 + this.currentCard]);
        this.currentCard += 3;
      } else if(this.round == 1){
        this.communityCards.push(this.cards[this.currentCard]);
        this.currentCard++;
      } else if(this.round == 2){
        this.communityCards.push(this.cards[this.currentCard]);
      }

    }

    //Current players
    addPlayer(userid){
      let userInfo = {
        userid: userid,
        hand: [],
        chips: 100,
        isFold: false
      }

      if(!useridExist(userid,this.players)){
        this.players.push(userInfo);
      } else{
        console.log('player already in lobby'); // REMOVE LATER
      }
    }

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
      if(userid == this.currentPlayer){
        this.turn++;
        console.log(this.turn);
        this.isRoundEnd();
        this.currentPlayer = this.players[this.turn].userid;
      } else {
        console.log('user is acting out of turn');
      }

      this.gameInfo(); //TO BE REMOVED
    }

    raise(userid){
      this.gameInfo(); //TO BE REMOVED
    }

    fold(userid){
      if(userid == currentPlayer){

      }else{
        console.log('user is acting out of turn');
      }

      this.gameInfo(); //TO BE REMOVED
    }

    isRoundEnd(){
      let player = this.players.length;

      if(this.turn == player){
        this.turn = 0;
        this.addCommunityCards();
        this.round++;
        return;
      }
    }

    //Tester functions
    gameInfo(){
      // console.log(JSON.stringify(this.players) + ' ' + this.round+ ' ' + this.currentPlayer + ' ');
      console.log(this.round + this.communityCards);
    }

}

module.exports = Table;
