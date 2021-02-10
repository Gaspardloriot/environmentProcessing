"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDataTcOne = void 0;
const index_1 = require("../../index");
const refTc_1_1 = require("./refTc_1");
const insertDataTcOne = (fileName, formattedData) => {
    const table = `${fileName}db_tc_1`;
    const sql = `INSERT INTO ${fileName}db.${table} (id, first_name, last_name, gender) VALUES ?`;
    formattedData.shift();
    index_1.db.query(sql, [formattedData], (err, res) => {
        if (err)
            throw err;
        else if (res) {
            refTc_1_1.refFile(table, "table1");
            console.log(`data uploaded into ${table} uploaded`);
        }
    });
};
exports.insertDataTcOne = insertDataTcOne;
