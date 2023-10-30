class Card {
  constructor(suit, value){
      this.suit = suit;
      this.value = value;
  }
}

class Deck {
    constructor() {
      //Deck properties and attributes
      let suit = ["diamonds", "clubs", "heart", "spade"];
      let cardValue = ['Ace', '2', '3', '4', '5','6','7','8', '9', '10', 'Jack', 'Queen', 'King'];
      this.cards = [];

      //creates each card for the deck
      for (let i = 0; i < suit.length; i++){
        for(let x = 0; x < cardValue.length; x++){
          let card = {
            suit: suit[i],
            cardValue: cardValue[x]
          }
          this.cards.push(card);
        }
      }
    }

    getCards(){
      return this.cards;
    }

    shuffleCards() {
    let cardsCount = this.cards.length;

      for (var i = cardsCount - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = this.cards[i];
          this.cards[i] = this.cards[j];
          this.cards[j] = temp;
      }
    }
 }

 module.exports = Deck;
