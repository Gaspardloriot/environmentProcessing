const color = require("bash-color");
const logUpdate = require("log-update");
import { db } from "../../index";
import { refFile } from "../refTc_tables";
import { getChunkedData } from "../chunks";
import { BIG_CHUNK_SIZE } from "../constants";
import { createTcSeven } from "../tc-7/add_table";
import { logProgress } from "../../../logging/logProgress";

/**
 *@description migrates all required data of trucost file number ref'd in function number to db
 * @param fileName name of client data file to ref and id trucost data tables and database
 * @param formattedData all formatted data for trucost table
 * @returns void
 */
const insertDataTcOne = (fileName: string, formattedData: any) => {
  const table: string = `${fileName}db_tc_6`;
  const sql: string = `INSERT INTO ${fileName}db.${table} VALUES ?`;
  formattedData.shift();
  const allChunks = getChunkedData(formattedData, BIG_CHUNK_SIZE);
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
  console.log("");
  refFile(table, "table6");
  createTcSeven(`${fileName}db`);
};

export { insertDataTcOne };
