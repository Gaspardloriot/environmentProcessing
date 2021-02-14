"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTcOne = void 0;
const index_1 = require("../../index");
const parse_1 = require("./parse");
const Table_format_1 = require("./Table_format");
/**
 *@description creates new table for trucost table number ref'd in title
 * @param tableName string name of client data file, serves to id each trucost file
 * @returns void
 */
const createTcOne = (tableName) => {
    const table = `${tableName}_tc_1`;
    const sql = `CREATE TABLE ${tableName}.${table}${Table_format_1.tc1Format}`;
    const fileName = tableName.substring(0, 4);
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log(`${table} created`);
            parse_1.parsedTcOne(fileName);
        }
    });
};
exports.createTcOne = createTcOne;
