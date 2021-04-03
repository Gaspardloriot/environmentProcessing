const color = require("bash-color");
const dataMeta = require("../../../dataStructures.json");
import { db } from "../index";
import { refDatabase } from "./updateMeta";
import { dbResponse } from "./types";
import { createTcOne } from "../truCost/tc-1/add_table";
import { checkAllDataUploaded } from "../../index";
import { drop_table } from "../utils/drop_table";
/**
 *@description inserts client data into db
 * @param tableName string name of client data
 * @param data  string[] all client data to be inserted
 * @returns void
 */
const insertData = async (
  tableName: string,
  data: string[],
  continueCycle: boolean
): Promise<void> => {
  data.shift();
  for (let i = 0; i < data.length; i++) {
    const post: any = getPost(data[i]);
    const sql: string = `INSERT INTO ${tableName}db.${tableName}_clientTable SET ?`;
    db.query(sql, post, (err: string, result: dbResponse) => {
      if (err) throw err;

      if (result && i === data.length - 1) {
        refDatabase(tableName);
        if (continueCycle) createTcOne(dataMeta.dataStructures.database);
        if (!continueCycle) {
          drop_table(`${tableName}db`, "project_data_final");
          checkAllDataUploaded();
        }
        console.log(
          "SUCCESS FOR",
          color.wrap(`${tableName}db`, color.colors.CYAN),
          "MIGRATION",
          color.wrap("DONE", color.colors.GREEN)
        );
      }
    });
  }
};

const getPost = (row: any) => {
  const post: any = {
    uniqid: `${row[1]}${row[10]}${row[14]}`,
    identifier: parseInt(`${row[10]}${row[14]}`),
    Fund_Name: row[1],
    Portfolio_Or_Index: row[2],
    Holding_Date: row[3],
    Holding_Currency: row[4],
    Report_Currency: row[5],
    Denominator_ExchangeRate: row[6],
    Report_ExchangeRate: row[7],
    Holding_VoH_Or_Weight: row[8],
    Report_VoH_Or_Weight: row[9],
    Trucost_UID: row[10],
    Identifier_Type: row[11],
    Identifier_Value: row[12],
    TC_Display_Name: row[13],
    Latest_Year: row[14],
    Accounting_Date: row[15],
    AccountingDate_ExchangeRate: row[16],
    Apportioning_Denominator_CRNCY: row[17],
    Apportioning_Factor: row[18],
    Weight: row[19],
    Revenue_USDm: row[20],
    Revenue_CRNCYm: row[21],
  };

  return post;
};

export { insertData };
