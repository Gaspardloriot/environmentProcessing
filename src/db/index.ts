const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});
const launchDatabase = () => {
  //Create connection

  //Connect
  db.connect((err: any) => {
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

  /*let sql =
    "CREATE TABLE sqldata(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err: any, result: any) => {
    if (err) throw err;
    console.log(result);
    console.log("Posts table created");
  });*/
};

const insertData = (data: string[]) => {
  for (let i = 0; i < data.length; i++) {
    let post = { title: data[i][2], body: data[i][1] };
    let sql = "INSERT INTO sqldata SET ?";
    db.query(sql, post, (err: any) => {
      if (err) throw err;
    });
  }
  console.log("Post 1 added...");
};

export { launchDatabase, insertData };
