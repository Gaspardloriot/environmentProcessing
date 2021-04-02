import { db } from "../../index";
import { parsedTcOne } from "./parse";
import { tc4Format } from "./Table_format";
/**
 *@description creates new table for trucost table number ref'd in title
 * @param tableName string name of client data file, serves to id each trucost file
 * @returns void
 */
const createTcFour = (tableName: string, continueCycle: boolean = true) => {
  const table: string = `${tableName}_tc_4`;
  const sql: string = `CREATE TABLE ${tableName}.${table}${tc4Format}`;
  const fileName: string = tableName.substring(0, 4);
  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      parsedTcOne(fileName, continueCycle);
    }
  });
};

export { createTcFour };
