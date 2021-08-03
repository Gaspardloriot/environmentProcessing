"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectTable = void 0;
const index_1 = require("../index");
const dataMeta = require("../../../dataStructures.json");
const projectTableCsv_1 = require("./projectTableCsv");
const getProjectTable = () => {
    const database = dataMeta.dataStructures.database;
    const sql = `SELECT * FROM ${database}.PROJECT_DATA_FINAL`;
    index_1.db.query(sql, (err, res) => {
        if (err)
            throw err;
        else if (res) {
            projectTableCsv_1.getProjectTableInCsv(res);
        }
    });
};
exports.getProjectTable = getProjectTable;
