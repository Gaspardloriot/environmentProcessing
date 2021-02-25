"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDb = void 0;
const color = require("bash-color");
const index_1 = require("./index");
const clientTable_1 = require("./clientData/clientTable");
/**
 *@description creates database based on client data file name
 * @param dataBase string name of database
 * @param formattedData string[] all parsed client data
 * @returns void
 */
const createDb = (dataBase, formattedData) => {
    const sql = `CREATE DATABASE ${dataBase}db`;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            clientTable_1.createClientTable(dataBase, formattedData);
            console.log("DATABASE", color.wrap(`${dataBase}db`, color.colors.CYAN), "INIT.....", color.wrap("DONE", color.colors.GREEN));
        }
    });
};
exports.createDb = createDb;
