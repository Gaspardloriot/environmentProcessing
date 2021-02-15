const color = require("bash-color");
import { getFilename } from "./prompt/prompt";
import { createTcOne } from "./db/truCost/tc-1/add_table";

getFilename();

const checkDbStatus = setInterval(() => {
  checkDataStructures();
}, 100);

/**
 * @description checks whether client data has been uploaded
 * @returns void
 */

const checkDataStructures = () => {
  const dataMeta = require("../dataStructures.json");

  if (dataMeta.dataStructures.clientData.uploaded) {
    createTcOne(dataMeta.dataStructures.database);
    console.log(
      "CLIENT DATA MIGRATION...",
      color.wrap("DONE", color.colors.GREEN)
    );
    stopCheck();
  }
};
const stopCheck = () => {
  clearInterval(checkDbStatus);
};
