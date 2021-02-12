"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertData = void 0;
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
        const post = { title: data[i][2], body: data[i][1] };
        const sql = `INSERT INTO ${tableName}db.${tableName}_clientTable SET ?`;
        index_1.db.query(sql, post, (err, result) => {
            if (err)
                throw err;
            else {
                if (result.insertId === data.length - 1) {
                    updateMeta_1.refDatabase(tableName);
                    console.log(result);
                    console.log(`client data inserted into ${tableName}db`);
                }
            }
        });
    }
};
exports.insertData = insertData;
