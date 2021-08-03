"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientTable = void 0;
const color = require("bash-color");
const index_1 = require("../index");
const insertClientData_1 = require("./insertClientData");
const Table_format_1 = require("./Table_format");
/**
 *@description creates client data table on db
 * @param tableName string name client data table
 * @param formattedData string[] client formatted data
 * @returns void
 */
const createClientTable = async (database, formattedData, continueCycle = true) => {
    const table = `${database}_clientTable`;
    const sql = `CREATE TABLE ${database}db.${table}${Table_format_1.client_tc}`;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log("TABLE", color.wrap(`${table}`, color.colors.CYAN), "CREATE.....", color.wrap("DONE", color.colors.GREEN));
        }
    });
    insertClientData_1.insertData(database, formattedData, continueCycle);
};
exports.createClientTable = createClientTable;
