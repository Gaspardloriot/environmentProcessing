"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color = require("bash-color");
const prompt_1 = require("./prompt/prompt");
const add_table_1 = require("./db/truCost/tc-1/add_table");
prompt_1.getFilename();
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
        add_table_1.createTcOne(dataMeta.dataStructures.database);
        console.log("CLIENT DATA MIGRATION...", color.wrap("DONE", color.colors.GREEN));
        stopCheck();
    }
};
const stopCheck = () => {
    clearInterval(checkDbStatus);
};
