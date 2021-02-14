import { db } from "../../index";
import { refFile } from "../refTc_tables";
<<<<<<< HEAD
import { getChunkedData } from "../chunks";
=======
>>>>>>> main
import { createTcTwo } from "../tc-2/add_table";

/**
 *@description migrates all required data of trucost file number ref'd in function number to db
 * @param fileName name of client data file to ref and id trucost data tables and database
 * @param formattedData all formatted data for trucost table
 * @returns void
 */
<<<<<<< HEAD
const insertDataTcOne = (fileName: string, formattedData: any) => {
  const table: string = `${fileName}db_tc_1`;
  const sql: string = `INSERT INTO ${fileName}db.${table} VALUES ?`;
  formattedData.shift();
  const allChunks = getChunkedData(formattedData);
  console.log(allChunks.length);
  for (let i = 0; i < allChunks.length; i++) {
    db.query(sql, [allChunks[i]], (err: string, res: string) => {
      if (err) throw err;
      else if (res) {
        console.log(
          `chunk  ${i + 1}/${
            allChunks.length
          }       uploaded into ${table}..........done`
        );
      }
    });
  }
  refFile(table, "table1");
  createTcTwo(`${fileName}db`);
=======
const insertDataTcOne = (fileName: string, formattedData: string[]) => {
  const table: string = `${fileName}db_tc_1`;
  const sql: string = `INSERT INTO ${fileName}db.${table} (id, first_name, last_name, gender) VALUES ?`;
  formattedData.shift();
  db.query(sql, [formattedData], (err: string, res: string) => {
    if (err) throw err;
    else if (res) {
      refFile(table, "table1");
      createTcTwo(`${fileName}db`);
      console.log(`data uploaded into ${table} uploaded..........done`);
    }
  });
>>>>>>> main
};

export { insertDataTcOne };
