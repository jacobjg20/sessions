class DataBase{
    constructor(){
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