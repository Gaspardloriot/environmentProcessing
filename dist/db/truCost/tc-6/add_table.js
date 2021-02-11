"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTcSix = void 0;
const index_1 = require("../../index");
const parse_1 = require("./parse");
const createTcSix = (tableName) => {
    const table = `${tableName}_tc_6`;
    const sql = `CREATE TABLE ${tableName}.${table}(id int, first_name VARCHAR(255), last_name VARCHAR(255), gender VARCHAR(255), PRIMARY KEY(id))`;
    const fileName = tableName.substring(0, 4);
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log(`${table} created`);
            parse_1.parsedTcOne(fileName);
        }
    });
};
exports.createTcSix = createTcSix;
