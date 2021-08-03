"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanSlate = void 0;
const color = require("bash-color");
const fs_1 = __importDefault(require("fs"));
const index_1 = require("../index");
const exit_1 = require("./exit");
const emptyDataStructures = {
    dataStructures: {
        database: null,
        clientData: { table: null, uploaded: false },
        trucostData: {
            table1: { table: null, uploaded: false },
            table2: { table: null, uploaded: false },
            table3: { table: null, uploaded: false },
            table4: { table: null, uploaded: false },
            table5: { table: null, uploaded: false },
            table6: { table: null, uploaded: false },
            table7: { table: null, uploaded: false },
        },
    },
};
const cleanSlate = async (database, continueCycle = true) => {
    const dataMetaPath = "dataStructures.json";
    if (!database)
        database = "placeholderName";
    fs_1.default.promises.writeFile(dataMetaPath, JSON.stringify(emptyDataStructures));
    const sql = `DROP DATABASE IF EXISTS ${database}`;
    await index_1.db.query(sql, (err, res) => {
        if (err)
            throw err;
        if (res) {
            console.log("\n\n\nDATABASE", color.wrap(`${database}`, color.colors.RED), "DROP.....", color.wrap("DONE", color.colors.GREEN));
            if (!continueCycle)
                exit_1.exitProcess();
        }
    });
};
exports.cleanSlate = cleanSlate;
