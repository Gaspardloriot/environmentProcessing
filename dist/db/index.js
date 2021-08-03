"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.launchDatabase = void 0;
require("dotenv").config();
const mysql = require("mysql");
const color = require("bash-color");
const createDb_1 = require("./createDb");
const db = mysql.createConnection({
    host: "localhost",
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`,
});
exports.db = db;
/**
 *@description launch and connect to database, then launch database creation
 * @param fileName string is the name of the client data file
 * @param formattedData string[] all formatted data of client file
 */
const launchDatabase = async (fileName, formattedData) => {
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log("SERVER_CONNECT...", color.wrap("DONE", color.colors.GREEN));
        createDb_1.createDb(fileName, formattedData);
    });
};
exports.launchDatabase = launchDatabase;
