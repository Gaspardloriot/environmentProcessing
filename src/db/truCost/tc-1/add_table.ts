import { db } from "../../index";
import { parsedTcOne } from "./parse";

const createTcOne = (tableName: string) => {
  const table: string = `${tableName}_tc_1`;
  const sql: string = `CREATE TABLE ${tableName}.${table}(id int, first_name VARCHAR(255), last_name VARCHAR(255), gender VARCHAR(255), PRIMARY KEY(id))`;
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
