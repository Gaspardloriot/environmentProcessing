"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAllDataUploaded = void 0;
const color = require("bash-color");
const prompt_1 = require("./prompt/prompt");
const carbonTc1_1 = require("./db/mapping/carbon/carbonTc1");
prompt_1.selectAction();
const checkAllDataUploaded = () => {
    const dataMeta = require("../dataStructures.json");
    const tcTables = dataMeta.dataStructures.trucostData;
    if (tcTables.table1.uploaded &&
        tcTables.table2.uploaded &&
        tcTables.table3.uploaded &&
        tcTables.table4.uploaded &&
        tcTables.table5.uploaded &&
        tcTables.table6.uploaded &&
        tcTables.table7.uploaded) {
        carbonTc1_1.createProject_data();
        console.log("all tables uploaded, moving on to project_data step");
    }
    else {
        console.log("not all tables were uploaded successfully");
    }
};
exports.checkAllDataUploaded = checkAllDataUploaded;
