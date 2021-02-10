import { getFilename } from "./prompt";

getFilename();

const checkOnDb = setInterval(() => {
  checkDataStructures();
}, 100);

function checkDataStructures() {
  const config = require("../dataStructures.json");

  if (config.dataStructures.clientData.uploaded) {
    console.log("client data uploaded");
    console.log(config.dataStructures.clientData.uploaded);
    myStopFunction();
  }
}
function myStopFunction() {
  clearInterval(checkOnDb);
}
