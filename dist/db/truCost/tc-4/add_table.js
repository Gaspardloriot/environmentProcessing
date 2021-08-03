"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTcFour = void 0;
const index_1 = require("../../index");
const parse_1 = require("./parse");
const Table_format_1 = require("./Table_format");
/**
 *@description creates new table for trucost table number ref'd in title
 * @param tableName string name of client data file, serves to id each trucost file
 * @returns void
 */
const createTcFour = (tableName, continueCycle = true) => {
    const table = `${tableName}_tc_4`;
    const sql = `CREATE TABLE ${tableName}.${table}${Table_format_1.tc4Format}`;
    const fileName = tableName.substring(0, 4);
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            parse_1.parsedTcOne(fileName, continueCycle);
        }
    });
};
exports.createTcFour = createTcFour;
