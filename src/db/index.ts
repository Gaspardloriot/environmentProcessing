require("dotenv").config();
const mysql = require("mysql");
const color = require("bash-color");
import { createDb } from "./createDb";

const db = mysql.createConnection({
  host: "localhost",
  user: `root`,
  password: `root`,
});

/**
 *@description launch and connect to database, then launch database creation
 * @param fileName string is the name of the client data file
 * @param formattedData string[] all formatted data of client file
 */
const launchDatabase = async (fileName: string, formattedData: string[]) => {
  console.log("hello world this is here bro")
  console.log(process.env.DB_PASS)
  console.log("SERVER_CONNECT...", color.wrap("DONE", color.colors.GREEN));
  createDb(fileName, formattedData);
};

export { launchDatabase, db };
