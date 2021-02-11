"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.launchDatabase = void 0;
const mysql = require("mysql");
const createDb_1 = require("./createDb");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "",
});
exports.db = db;
const launchDatabase = async (fileName, formattedData) => {
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.info("mysql connected successfully..........done");
        createDb_1.createDb(fileName, formattedData);
    });
};
exports.launchDatabase = launchDatabase;
