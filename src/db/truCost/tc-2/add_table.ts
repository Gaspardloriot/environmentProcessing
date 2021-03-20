import { db } from "../../index";
import { parsedTcOne } from "./parse";
import { tc2Format } from "./Table_format";
/**
 *@description creates new table for trucost table number ref'd in title
 * @param tableName string name of client data file, serves to id each trucost file
 * @returns void
 */
const createTcTwo = (tableName: string) => {
  const table: string = `${tableName}_tc_2`;
  const sql: string = `CREATE TABLE ${tableName}.${table}${tc2Format}`;
  const fileName: string = tableName.substring(0, 4);
  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      parsedTcOne(fileName);
    }
  });
};

export { createTcTwo };
