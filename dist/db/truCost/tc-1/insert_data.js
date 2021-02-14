"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDataTcOne = void 0;
const index_1 = require("../../index");
const refTc_tables_1 = require("../refTc_tables");
const chunks_1 = require("../chunks");
const add_table_1 = require("../tc-2/add_table");
/**
 *@description migrates all required data of trucost file number ref'd in function number to db
 * @param fileName name of client data file to ref and id trucost data tables and database
 * @param formattedData all formatted data for trucost table
 * @returns void
 */
const insertDataTcOne = (fileName, formattedData) => {
    const table = `${fileName}db_tc_1`;
    const sql = `INSERT INTO ${fileName}db.${table} VALUES ?`;
    formattedData.shift();
    const allChunks = chunks_1.getChunkedData(formattedData);
    console.log(allChunks.length);
    for (let i = 0; i < allChunks.length; i++) {
        index_1.db.query(sql, [allChunks[i]], (err, res) => {
            if (err)
                throw err;
            else if (res) {
                console.log(`chunk  ${i + 1}/${allChunks.length}       uploaded into ${table}..........done`);
            }
        });
    }
    refTc_tables_1.refFile(table, "table1");
    add_table_1.createTcTwo(`${fileName}db`);
};
exports.insertDataTcOne = insertDataTcOne;
