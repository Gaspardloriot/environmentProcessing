const mysql = require("mysql");
import { createDb } from "./createDb";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

const launchDatabase = async (fileName: string, formattedData: string[]) => {
  db.connect((err: any) => {
    if (err) {
      throw err;
    }
    console.info("mysql connected successfully");
    createDb(fileName, formattedData);
  });
};

export { launchDatabase, db };
