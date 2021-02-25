"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDataTcOne = void 0;
const color = require("bash-color");
const index_1 = require("../../index");
const refTc_tables_1 = require("../refTc_tables");
const add_table_1 = require("../tc-4/add_table");
const chunks_1 = require("../chunks");
/**
 *@description migrates all required data of trucost file number ref'd in function number to db
 * @param fileName name of client data file to ref and id trucost data tables and database
 * @param formattedData all formatted data for trucost table
 * @returns void
 */
const insertDataTcOne = (fileName, formattedData) => {
    const table = `${fileName}db_tc_3`;
    const sql = `INSERT INTO ${fileName}db.${table} VALUES ?`;
    formattedData.shift();
    formattedData.forEach((row) => row.splice(31, 1));
    formattedData.forEach((row) => row.splice(49, 1));
    formattedData.forEach((row) => row.splice(59, 2));
    const allChunks = chunks_1.getChunkedData(formattedData);
    console.log("");
    for (let i = 0; i < allChunks.length; i++) {
        index_1.db.query(sql, [allChunks[i]], (err, res) => {
            if (err)
                throw err;
            else if (res) {
                const chunkNumber = i + 1;
                const chunkString = `0000${chunkNumber.toString()}`;
                const chunkNumberLog = chunkString.substring(chunkString.length - 3, chunkString.length);
                console.log("CHUNK", color.wrap(`    ${chunkNumberLog}/${allChunks.length}`, color.colors.YELLOW), color.wrap(`    DONE`, color.colors.GREEN));
            }
        });
    }
    refTc_tables_1.refFile(table, "table3");
    add_table_1.createTcFour(`${fileName}db`);
};
exports.insertDataTcOne = insertDataTcOne;
