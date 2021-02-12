"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDataTcOne = void 0;
const index_1 = require("../../index");
const refTc_tables_1 = require("../refTc_tables");
/**
 *@description migrates all required data of trucost file number ref'd in function number to db
 * @param fileName name of client data file to ref and id trucost data tables and database
 * @param formattedData all formatted data for trucost table
 * @returns void
 */
const insertDataTcOne = (fileName, formattedData) => {
    const table = `${fileName}db_tc_6`;
    const sql = `INSERT INTO ${fileName}db.${table} (id, first_name, last_name, gender) VALUES ?`;
    formattedData.shift();
    index_1.db.query(sql, [formattedData], (err, res) => {
        if (err)
            throw err;
        else if (res) {
            refTc_tables_1.refFile(table, "table6");
            console.log(`data uploaded into ${table} uploaded..........done`);
            console.log("\n SQL DATA LOADED \n READY FOR ANALYSIS");
        }
    });
};
exports.insertDataTcOne = insertDataTcOne;
