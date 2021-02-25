"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertData = void 0;
const color = require("bash-color");
const index_1 = require("../index");
const updateMeta_1 = require("./updateMeta");
/**
 *@description inserts client data into db
 * @param tableName string name of client data
 * @param data  string[] all client data to be inserted
 * @returns void
 */
const insertData = async (tableName, data) => {
    for (let i = 0; i < data.length; i++) {
        const post = { title: data[i][2], body: data[i][3] };
        const sql = `INSERT INTO ${tableName}db.${tableName}_clientTable SET ?`;
        index_1.db.query(sql, post, (err, result) => {
            if (err)
                throw err;
            else {
                if (result.insertId === data.length - 1) {
                    updateMeta_1.refDatabase(tableName);
                    console.log("SUCCESS FOR", color.wrap(`${tableName}db`, color.colors.CYAN), "MIGRATION", color.wrap("DONE", color.colors.GREEN));
                }
            }
        });
    }
};
exports.insertData = insertData;
