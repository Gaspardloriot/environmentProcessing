import { db } from "../index";
import { refDatabase } from "./dbAdder";

const insertData = (tableName: string, data: string[]) => {
  for (let i = 0; i < data.length; i++) {
    const post = { title: data[i][2], body: data[i][1] };
    const sql = `INSERT INTO ${tableName}db.${tableName}_clientTable SET ?`;
    db.query(sql, post, (err: string, result: any) => {
      if (err) throw err;
      else {
        if (result.insertId === data.length - 1) {
          refDatabase(tableName);
          console.log(`client data inserted into ${tableName}db`);
        }
      }
    });
  }
};

export { insertData };
