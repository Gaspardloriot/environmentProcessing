"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchDatabase = void 0;
const express = require("express");
const mysql = require("mysql");
const launchDatabase = () => {
    //Create connection
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "nodemysql",
    });
    //Connect
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log("mysql connected...");
    });
    const app = express();
    app.use(express.json());
    //Create db
    /*let sql = "CREATE DATABASE tata";
    db.query(sql, (err: any, result: any) => {
      if (err) throw err;
      console.log("Database created...");
      console.log(result, "operation successful");
    });*/
    let sql = "CREATE TABLE sqldata(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql, (err, result) => {
        if (err)
            throw err;
        console.log(result);
        console.log("Posts table created");
    });
};
exports.launchDatabase = launchDatabase;
