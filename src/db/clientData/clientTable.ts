import { db } from "../index";
import { insertData } from "./insertClientData";

/**
 *@description creates client data table on db
 * @param tableName string name client data table
 * @param formattedData string[] client formatted data
 * @returns void
 */
const createClientTable = async (
<<<<<<< HEAD
  database: string,
  formattedData: string[]
): Promise<void> => {
  const table: string = `${database}_clientTable`;
  const sql: string = `CREATE TABLE ${database}db.${table}(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))`;
=======
  tableName: string,
  formattedData: string[]
): Promise<void> => {
  const table: string = `${tableName}_clientTable`;
  const sql: string = `CREATE TABLE ${tableName}db.${table}(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))`;
>>>>>>> main

  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
<<<<<<< HEAD
      console.log(`${database}_clientTable created`);
    }
  });
  insertData(database, formattedData);
=======
      console.log(`${tableName}_clientTable created`);
    }
  });
  insertData(tableName, formattedData);
>>>>>>> main
};

export { createClientTable };
