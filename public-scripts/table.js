// Get data for Current table, meaning it can be data for server Jammy or Dirtcup
function getCurrentTableState(){
  fetch("/getCurrentTableState", {
        method: "POST",
      });
}

function shuffleCards(){
  fetch("/shuffleCards", {
        method: "POST",
      });
}
