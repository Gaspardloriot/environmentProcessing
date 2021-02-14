"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientTable = void 0;
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
            console.log(`${database}_clientTable created`);
        }
    });
    insertClientData_1.insertData(database, formattedData);
};
exports.createClientTable = createClientTable;
