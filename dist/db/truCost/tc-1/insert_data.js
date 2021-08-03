"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDataTcOne = void 0;
const logUpdate = require("log-update");
const index_1 = require("../../index");
const refTc_tables_1 = require("../refTc_tables");
const add_table_1 = require("../tc-2/add_table");
const chunks_1 = require("../chunks");
const constants_1 = require("../constants");
const logProgress_1 = require("../../../logging/logProgress");
const exit_1 = require("../../utils/exit");
/**
 * @description migrates all required data of trucost file number ref'd in function number to db
 * @param fileName name of client data file to ref and id trucost data tables and database
 * @param formattedData all formatted data for trucost table
 * @returns void
 */
const insertDataTcOne = (fileName, formattedData, continueCycle) => {
    const table = `${fileName}db_tc_1`;
    const sql = `INSERT INTO ${fileName}db.${table} VALUES ?`;
    formattedData.shift();
    const allChunks = chunks_1.getChunkedData(formattedData, constants_1.SMALL_CHUNK_SIZE);
    console.log("");
    for (let i = 0; i < allChunks.length; i++) {
        index_1.db.query(sql, [allChunks[i]], (err, res) => {
            if (err)
                throw err;
            if (res) {
                const chunkNumber = i + 1;
                logProgress_1.logProgress(chunkNumber, allChunks.length);
                if (chunkNumber === allChunks.length && !continueCycle)
                    exit_1.exitProcess();
            }
        });
    }
    logUpdate.clear();
    refTc_tables_1.refFile(table, "table1");
    if (continueCycle)
        add_table_1.createTcTwo(`${fileName}db`, continueCycle);
};
exports.insertDataTcOne = insertDataTcOne;
