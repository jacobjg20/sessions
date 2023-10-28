var lobbies; 

function refreshLobby(){
    //fetches lobby info
    getLobbyInfo();
    createLobbies(lobbies);

}

function getLobbyInfo(){
    fetch("https://scaling-trout-54rq4pv55r7f4jxx-3000.app.github.dev/getLobby", 
    {method: 'POST'})
    .then(data => {
        return data.json()
    })
    .then(data => 
        {lobbies = data
    }); 
}

function createLobbies(lobbies){  
    for (let key in lobbies) {
        if (lobbies.hasOwnProperty(key)) {
            let joinButton = document.createElement('button');
            joinButton.textContent = 'Join';
            joinButton.onclick = function () {joinServer(lobbies[key])};
            document.body.appendChild(joinButton);
            lobbyName = lobbies[key];
        }
    }
}

function joinServer(url){
    console.log(url);
}