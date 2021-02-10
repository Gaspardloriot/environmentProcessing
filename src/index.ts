import { getFilename } from "./prompt";
import { createTcOne } from "./db/truCost/tc-1/add_table";
getFilename();

const checkOnDb = setInterval(() => {
  checkDataStructures();
}, 100);

function checkDataStructures() {
  const config = require("../dataStructures.json");

  if (config.dataStructures.clientData.uploaded) {
    createTcOne(config.dataStructures.database);
    console.log("client data uploaded");
    console.log(config.dataStructures.clientData.uploaded);
    myStopFunction();
  }
}
function myStopFunction() {
  clearInterval(checkOnDb);
}
