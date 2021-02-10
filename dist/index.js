"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_1 = require("./prompt");
prompt_1.getFilename();
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
