import { db } from "./index";
import { insertData } from "./insertClientData";

const createClientTable = async (
  tableName: string,
  formattedData: string[]
) => {
  const table = `${tableName}_clientTable`;
  const sql = `CREATE TABLE ${tableName}db.${table}(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))`;

  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      console.log(`${tableName}_clientTable created`);
    }
  });
  insertData(tableName, formattedData);
};

export { createClientTable };
