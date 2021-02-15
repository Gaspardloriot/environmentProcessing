"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientTable = void 0;
const color = require("bash-color");
const index_1 = require("../index");
const insertClientData_1 = require("./insertClientData");
/**
 *@description creates client data table on db
 * @param tableName string name client data table
 * @param formattedData string[] client formatted data
 * @returns void
 */
const createClientTable = async (database, formattedData) => {
    const table = `${database}_clientTable`;
    const sql = `CREATE TABLE ${database}db.${table}(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))`;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log("TABLE", color.wrap(`${table}`, color.colors.CYAN), "CREATE.....", color.wrap("DONE", color.colors.GREEN));
        }
    });
    insertClientData_1.insertData(database, formattedData);
};
exports.createClientTable = createClientTable;
