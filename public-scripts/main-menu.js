var lobbies;
var directory = 'http://localhost:3000/';

function refreshLobby(){
    //fetches lobby info
    getTables();
    createLobbies(lobbies);
}

function getTables(){

    fetch( directory + "getTables",
    {method: 'POST'})
    .then(data => {
        return data.json()
    })
    .then(data =>
        {lobbies = data
    });
}

//creates join buttons
function createLobbies(lobbies){
    for (let key in lobbies) {
        if (lobbies.hasOwnProperty(key)) {
            let joinButton = document.createElement('button');
            joinButton.textContent = key;
            joinButton.onclick = function () {joinServer(key, lobbies[key])};
            document.body.appendChild(joinButton);
            lobbyName = lobbies[key];
        }
    }
}

function joinServer(name,url){
    if(name == "jammy"){
        fetch(directory + "joinServerJammy",
        {method: 'POST'});
    } else if (name == "dirtcup"){
        fetch(directory + "joinServerDirtcup",
        {method: 'POST'});
    }

}
