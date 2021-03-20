const logUpdate = require("log-update");
import { db } from "../../index";
import { refFile } from "../refTc_tables";
import { createTcTwo } from "../tc-2/add_table";
import { getChunkedData } from "../chunks";
import { SMALL_CHUNK_SIZE } from "../constants";
import { logProgress } from "../../../logging/logProgress";

/**
 * @description migrates all required data of trucost file number ref'd in function number to db
 * @param fileName name of client data file to ref and id trucost data tables and database
 * @param formattedData all formatted data for trucost table
 * @returns void
 */
const insertDataTcOne = (fileName: string, formattedData: any) => {
  const table: string = `${fileName}db_tc_1`;
  const sql: string = `INSERT INTO ${fileName}db.${table} VALUES ?`;
  formattedData.shift();
  const allChunks = getChunkedData(formattedData, SMALL_CHUNK_SIZE);
  console.log("");
  for (let i = 0; i < allChunks.length; i++) {
    db.query(sql, [allChunks[i]], (err: string, res: string) => {
      if (err) throw err;
      else if (res) {
        const chunkNumber: number = i + 1;
        logProgress(chunkNumber, allChunks.length);
      }
    });
  }
  logUpdate.clear();
  refFile(table, "table1");
  createTcTwo(`${fileName}db`);
};

export { insertDataTcOne };
