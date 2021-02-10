"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientTable = void 0;
const index_1 = require("../index");
const insertClientData_1 = require("./insertClientData");
const createClientTable = async (tableName, formattedData) => {
    const table = `${tableName}_clientTable`;
    const sql = `CREATE TABLE ${tableName}db.${table}(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))`;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log(`${tableName}_clientTable created`);
        }
    });
    insertClientData_1.insertData(tableName, formattedData);
};
exports.createClientTable = createClientTable;
