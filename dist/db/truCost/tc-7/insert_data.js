"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDataTcOne = void 0;
const color = require("bash-color");
const logUpdate = require("log-update");
const index_1 = require("../../index");
const refTc_tables_1 = require("../refTc_tables");
const chunks_1 = require("../chunks");
const constants_1 = require("../constants");
const index_2 = require("../../../index");
const logProgress_1 = require("../../../logging/logProgress");
/**
 *@description migrates all required data of trucost file number ref'd in function number to db
 * @param fileName name of client data file to ref and id trucost data tables and database
 * @param formattedData all formatted data for trucost table
 * @returns void
 */
const insertDataTcOne = (fileName, formattedData) => {
    const table = `${fileName}db_tc_7`;
    const sql = `INSERT INTO ${fileName}db.${table} VALUES ?`;
    formattedData.shift();
    const allChunks = chunks_1.getChunkedData(formattedData, constants_1.BIG_CHUNK_SIZE);
    console.log("");
    for (let i = 0; i < allChunks.length; i++) {
        allChunks[i].forEach((row) => {
            row[0] = `${row[0]}${row[16]}`;
        });
        index_1.db.query(sql, [allChunks[i]], (err, res) => {
            if (err)
                throw err;
            else if (res) {
                const chunkNumber = i + 1;
                logProgress_1.logProgress(chunkNumber, allChunks.length);
                if (chunkNumber === allChunks.length) {
                    index_2.checkAllDataUploaded();
                }
            }
        });
    }
    logUpdate.clear();
    console.log("");
    refTc_tables_1.refFile(table, "table7");
};
exports.insertDataTcOne = insertDataTcOne;
