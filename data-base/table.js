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
    }

    getCurrentTableState(){
      return this.players;
    }

    addPlayer(userid){
      if(!useridExist(userid,this.players)){
        this.players.push(userid);
      }
      console.log('player already in lobby');
    }

}

module.exports = Table;
