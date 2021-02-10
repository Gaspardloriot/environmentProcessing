"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDb = void 0;
const index_1 = require("./index");
const clientTable_1 = require("./clientData/clientTable");
const createDb = (dataBase, formattedData) => {
    const sql = `CREATE DATABASE ${dataBase}db`;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            clientTable_1.createClientTable(dataBase, formattedData);
            console.log(`Database ${dataBase}db created...`);
        }
    });
};
exports.createDb = createDb;
