const color = require("bash-color");
import { db } from "../../index";
import { parsedTcOne } from "./parse";
import { tc5Format } from "./Table_format";

/**
 *@description creates new table for trucost table number ref'd in title
 * @param tableName string name of client data file, serves to id each trucost file
 * @returns void
 */
const createTcFive = (tableName: string) => {
  const table: string = `${tableName}_tc_5`;
  const sql: string = `CREATE TABLE ${tableName}.${table}${tc5Format}`;
  const fileName: string = tableName.substring(0, 4);
  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      console.log(
        "TABLE",
        color.wrap(`${table}`, color.colors.CYAN),
        "CREATE.....",
        color.wrap("DONE", color.colors.GREEN)
      );
      parsedTcOne(fileName);
    }
  });
};

export { createTcFive };
