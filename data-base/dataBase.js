class DataBase{
    constructor(){
        this.tables = {
            jammy: 'https://scaling-trout-54rq4pv55r7f4jxx-3000.app.github.dev/jammy',
            dirtcup: 'https://scaling-trout-54rq4pv55r7f4jxx-3000.app.github.dev/dirtcup'
        };

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

    getTables(){
        return JSON.stringify(this.tables);
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