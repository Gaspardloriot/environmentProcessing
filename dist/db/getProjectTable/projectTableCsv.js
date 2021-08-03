"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectTableInCsv = void 0;
const ObjectsToCsv = require("objects-to-csv");
const sendProjectTable_1 = require("../../mailService/sendProjectTable");
const getProjectTableInCsv = async (projectTableJson) => {
    const projectTableCsv = new ObjectsToCsv(projectTableJson);
    await projectTableCsv.toDisk("./src/db/getProjectTable/project_table.csv");
    await sendProjectTable_1.sendProjectTable().catch(console.error);
};
exports.getProjectTableInCsv = getProjectTableInCsv;
