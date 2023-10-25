class DataBase{
    constructor(){
        this.lobby = {lobby: 'spices'};

        this.users = [
            {
                name: 'Jacob',
                password: 'mypassword'
            },

            {
                name: 'Kathryn',
                password: 'mypassword'
            }
        ]
    }

    addUser(){

    }

    getLobbies(){
        return JSON.stringify(this.lobby);
    }

    ifUserExist(userName, password){
        for (let i = 0; i < this.users.length; i++){
            
            if(this.users[i].name == userName && this.users[i].password == password){
               return true;
            }
        }
        
        console.log('user does not exist');
    }
}

module.exports = DataBase;