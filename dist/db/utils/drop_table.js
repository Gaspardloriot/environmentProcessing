"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drop_table = void 0;
const color = require("bash-color");
const index_1 = require("../index");
const drop_table = async (database, toDrop) => {
    const sql = `DROP TABLE IF EXISTS ${database}.${toDrop}`;
    await index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log("TABLE", color.wrap(`${toDrop}`, color.colors.RED), "DROP.....", color.wrap("DONE", color.colors.GREEN));
        }
    });
};
exports.drop_table = drop_table;
