import { db } from "../../index";
import { refFile } from "../refTc_tables";
import { getChunkedData } from "../chunks";
import { createTcTwo } from "../tc-2/add_table";

/**
 *@description migrates all required data of trucost file number ref'd in function number to db
 * @param fileName name of client data file to ref and id trucost data tables and database
 * @param formattedData all formatted data for trucost table
 * @returns void
 */
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
};

export { insertDataTcOne };
