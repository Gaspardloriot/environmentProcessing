const mysql = require("mysql");
import { createDb } from "./createDb";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

/**
<<<<<<< HEAD
 *@description launch and connect to database, then launch database creation
=======
 *@description launch and connect to database, then launch launch database creation
>>>>>>> main
 * @param fileName string is the name of the client data file
 * @param formattedData string[] all formatted data of client file
 */
const launchDatabase = async (fileName: string, formattedData: string[]) => {
  db.connect((err: any) => {
    if (err) {
      throw err;
    }
    console.info("mysql connected successfully..........done");
    createDb(fileName, formattedData);
  });
};

export { launchDatabase, db };
