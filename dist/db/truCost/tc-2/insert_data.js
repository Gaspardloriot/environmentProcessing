"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDataTcOne = void 0;
const index_1 = require("../../index");
const refTc_tables_1 = require("../refTc_tables");
const add_table_1 = require("../tc-3/add_table");
const insertDataTcOne = (fileName, formattedData) => {
    const table = `${fileName}db_tc_2`;
    const sql = `INSERT INTO ${fileName}db.${table} (id, first_name, last_name, gender) VALUES ?`;
    formattedData.shift();
    index_1.db.query(sql, [formattedData], (err, res) => {
        if (err)
            throw err;
        else if (res) {
            refTc_tables_1.refFile(table, "table2");
            add_table_1.createTcThree(`${fileName}db`);
            console.log(`data uploaded into ${table} uploaded..........done`);
        }
    });
};
exports.insertDataTcOne = insertDataTcOne;