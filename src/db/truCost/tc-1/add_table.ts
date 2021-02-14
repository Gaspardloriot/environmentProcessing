import { db } from "../../index";
import { parsedTcOne } from "./parse";
<<<<<<< HEAD
import { tc1Format } from "./Table_format";
=======
>>>>>>> main

/**
 *@description creates new table for trucost table number ref'd in title
 * @param tableName string name of client data file, serves to id each trucost file
 * @returns void
 */
const createTcOne = (tableName: string): void => {
  const table: string = `${tableName}_tc_1`;
<<<<<<< HEAD
  const sql: string = `CREATE TABLE ${tableName}.${table}${tc1Format}`;
=======
  const sql: string = `CREATE TABLE ${tableName}.${table}(id int, first_name VARCHAR(255), last_name VARCHAR(255), gender VARCHAR(255), PRIMARY KEY(id))`;
>>>>>>> main
  const fileName: string = tableName.substring(0, 4);
  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      console.log(`${table} created`);
      parsedTcOne(fileName);
    }
  });
};

export { createTcOne };
