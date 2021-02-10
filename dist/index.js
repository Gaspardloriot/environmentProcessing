"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_1 = require("./prompt");
const add_table_1 = require("./db/truCost/tc-1/add_table");
prompt_1.getFilename();
const checkOnDb = setInterval(() => {
    checkDataStructures();
}, 100);
function checkDataStructures() {
    const config = require("../dataStructures.json");
    if (config.dataStructures.clientData.uploaded) {
        add_table_1.createTcOne(config.dataStructures.database);
        console.log("client data uploaded");
        console.log(config.dataStructures.clientData.uploaded);
        myStopFunction();
    }
}
function myStopFunction() {
    clearInterval(checkOnDb);
}
