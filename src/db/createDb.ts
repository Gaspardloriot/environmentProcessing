const color = require("bash-color");
import { db } from "./index";
import { createClientTable } from "./clientData/clientTable";

/**
 *@description creates database based on client data file name
 * @param dataBase string name of database
 * @param formattedData string[] all parsed client data
 * @returns void
 */
const createDb = (dataBase: string, formattedData: string[]): void => {
  const sql: string = `CREATE DATABASE ${dataBase}db`;
  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      createClientTable(dataBase, formattedData);
      console.log(
        "DATABASE",
        color.wrap(`${dataBase}db`, color.colors.CYAN),
        "INIT.....",
        color.wrap("DONE", color.colors.GREEN)
      );
    }
  });
};

export { createDb };
