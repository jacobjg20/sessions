var lobbies; 

function refreshLobby(){
    //fetches lobby info
    getTables();
    createLobbies(lobbies);

}

function getTables(){
    fetch("https://scaling-trout-54rq4pv55r7f4jxx-3000.app.github.dev/getTables", 
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
        fetch("https://scaling-trout-54rq4pv55r7f4jxx-3000.app.github.dev/joinServerJammy", 
        {method: 'POST'});
    } else if (name == "dirtcup"){
        fetch("https://scaling-trout-54rq4pv55r7f4jxx-3000.app.github.dev/joinServerDirtcup", 
        {method: 'POST'});
    }

}