import { db } from "../../index";
import { refFile } from "../refTc_tables";
import { createTcThree } from "../tc-3/add_table";
const insertDataTcOne = (fileName: string, formattedData: string[]) => {
  const table: string = `${fileName}db_tc_2`;
  const sql: string = `INSERT INTO ${fileName}db.${table} (id, first_name, last_name, gender) VALUES ?`;
  formattedData.shift();
  db.query(sql, [formattedData], (err: string, res: string) => {
    if (err) throw err;
    else if (res) {
      refFile(table, "table2");
      createTcThree(`${fileName}db`);
      console.log(`data uploaded into ${table} uploaded..........done`);
    }
  });
};

export { insertDataTcOne };
