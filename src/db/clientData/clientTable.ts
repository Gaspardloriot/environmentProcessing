const color = require("bash-color");
import { db } from "../index";
import { insertData } from "./insertClientData";
import { client_tc } from "./Table_format";

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
  const sql: string = `CREATE TABLE ${database}db.${table}${client_tc}`;

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
