"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDataTcOne = void 0;
const index_1 = require("../../index");
const insertDataTcOne = (fileName, formattedData) => {
    const table = `${fileName}_tc_1`;
    const sql = `INSERT INTO ${fileName}db.${table} (id, first_name, last_name, gender) VALUES ?`;
    index_1.db.query(sql, [formattedData], (err, res) => {
        if (err)
            throw err;
        else {
            console.log(res);
            console.log(`data uploaded into ${table} uploaded`);
        }
    });
};
exports.insertDataTcOne = insertDataTcOne;
