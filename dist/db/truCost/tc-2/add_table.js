"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTcTwo = void 0;
const color = require("bash-color");
const index_1 = require("../../index");
const parse_1 = require("./parse");
/**
 *@description creates new table for trucost table number ref'd in title
 * @param tableName string name of client data file, serves to id each trucost file
 * @returns void
 */
const createTcTwo = (tableName) => {
    const table = `${tableName}_tc_2`;
    const sql = `CREATE TABLE ${tableName}.${table}(id int, first_name VARCHAR(255), last_name VARCHAR(255), gender VARCHAR(255), PRIMARY KEY(id))`;
    const fileName = tableName.substring(0, 4);
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log("TABLE", color.wrap(`${table}`, color.colors.CYAN), "CREATE.....", color.wrap("DONE", color.colors.GREEN));
            parse_1.parsedTcOne(fileName);
        }
    });
};
exports.createTcTwo = createTcTwo;
