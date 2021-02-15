const color = require("bash-color");
import { db } from "../index";
import { insertData } from "./insertClientData";

/**
 *@description creates client data table on db
 * @param tableName string name client data table
 * @param formattedData string[] client formatted data
 * @returns void
 */
const createClientTable = async (
  database: string,
  formattedData: string[]
): Promise<void> => {
  const table: string = `${database}_clientTable`;
  const sql: string = `CREATE TABLE ${database}db.${table}(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))`;

  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      console.log(
        "TABLE",
        color.wrap(`${table}`, color.colors.CYAN),
        "CREATE.....",
        color.wrap("DONE", color.colors.GREEN)
      );
    }
  });
  insertData(database, formattedData);
};

export { createClientTable };
