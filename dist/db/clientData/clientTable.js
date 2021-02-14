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
<<<<<<< HEAD
const createClientTable = async (database, formattedData) => {
    const table = `${database}_clientTable`;
    const sql = `CREATE TABLE ${database}db.${table}(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))`;
=======
const createClientTable = async (tableName, formattedData) => {
    const table = `${tableName}_clientTable`;
    const sql = `CREATE TABLE ${tableName}db.${table}(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))`;
>>>>>>> main
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
<<<<<<< HEAD
            console.log(`${database}_clientTable created`);
        }
    });
    insertClientData_1.insertData(database, formattedData);
=======
            console.log(`${tableName}_clientTable created`);
        }
    });
    insertClientData_1.insertData(tableName, formattedData);
>>>>>>> main
};
exports.createClientTable = createClientTable;
