"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertData = void 0;
const index_1 = require("./index");
const dbAdder_1 = require("./dbAdder");
const insertData = (tableName, data) => {
    for (let i = 0; i < data.length; i++) {
        const post = { title: data[i][2], body: data[i][1] };
        const sql = `INSERT INTO ${tableName}db.${tableName}_clientTable SET ?`;
        index_1.db.query(sql, post, (err) => {
            if (err)
                throw err;
            else {
                if (i === data.length - 1) {
                    dbAdder_1.refDatabase(tableName);
                    console.log(`client data inserted into ${tableName}db`);
                }
            }
        });
    }
};
exports.insertData = insertData;
