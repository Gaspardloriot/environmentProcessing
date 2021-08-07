require("dotenv").config();
const mysql = require("mysql");
const color = require("bash-color");
import { createDb } from "./createDb";


/*const db = mysql.createConnection({
  host: '172.18.0.1',
    user: `mysql`,
    password: `1234`,
    port: '3307',
    database:'tester'
});*/

const db = mysql.createConnection({
  host: 'localhost',
    user: `root`,
    password: `root`,
    port: '3307'
});

/**
 *@description launch and connect to database, then launch database creation
 * @param fileName string is the name of the client data file
 * @param formattedData string[] all formatted data of client file
 */
const launchDatabase = async (fileName: string, formattedData: string[]) => { 
  
    console.log("SERVER_CONNECT...", color.wrap("DONE", color.colors.GREEN));
    createDb(fileName, formattedData);
  
};

export { launchDatabase, db };
