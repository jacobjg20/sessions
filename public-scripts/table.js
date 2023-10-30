// Get data for Current table, meaning it can be data for server Jammy or Dirtcup
function action(){
  console.log('hello');
  fetch("/getCurrentTableState", {
        method: "POST",
      });

}
