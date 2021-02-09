import { getFilename } from "./prompt";

getFilename();

const checkOnDb = setInterval(() => {
  checkDataStructures();
}, 100);

let cool = 0;
function checkDataStructures() {
  cool = cool + 1;
  var config = require("../dataStructures.json");

  if (config.dataStructures.clientData.uploaded) {
    console.log("client data uploaded");
    console.log(config.dataStructures.clientData.uploaded);
    console.log(cool);
    myStopFunction();
  }
}
function myStopFunction() {
  clearInterval(checkOnDb);
}
