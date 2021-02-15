const color = require("bash-color");
import { db } from "../index";
import { refDatabase } from "./updateMeta";
import { postType, dbResponse } from "./types";

/**
 *@description inserts client data into db
 * @param tableName string name of client data
 * @param data  string[] all client data to be inserted
 * @returns void
 */
const insertData = async (tableName: string, data: string[]): Promise<void> => {
  for (let i = 0; i < data.length; i++) {
    const post: postType = { title: data[i][2], body: data[i][3] };
    const sql: string = `INSERT INTO ${tableName}db.${tableName}_clientTable SET ?`;
    db.query(sql, post, (err: string, result: dbResponse) => {
      if (err) throw err;
      else {
        if (result.insertId === data.length - 1) {
          refDatabase(tableName);
          console.log(
            "SUCCESS FOR",
            color.wrap(`${tableName}db`, color.colors.CYAN),
            "MIGRATION",
            color.wrap("DONE", color.colors.GREEN)
          );
        }
      }
    });
  }
};

export { insertData };
