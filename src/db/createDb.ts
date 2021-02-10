import { db } from "./index";
import { createClientTable } from "./clientData/clientTable";

const createDb = (dataBase: string, formattedData: string[]) => {
  const sql: string = `CREATE DATABASE ${dataBase}db`;
  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      createClientTable(dataBase, formattedData);
      console.log(`Database ${dataBase}db created...`);
    }
  });
};

export { createDb };
