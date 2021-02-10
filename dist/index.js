"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_1 = require("./prompt");
prompt_1.getFilename();
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
