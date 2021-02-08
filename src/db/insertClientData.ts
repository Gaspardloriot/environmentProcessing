import { db } from "./index";

const insertData = (tableName: string, data: string[]) => {
  for (let i = 0; i < data.length; i++) {
    const post = { title: data[i][2], body: data[i][1] };
    const sql = `INSERT INTO ${tableName}db.${tableName}_clientTable SET ?`;
    db.query(sql, post, (err: any) => {
      if (err) throw err;
      else {
        i === data.length - 1 &&
          console.log(`client data inserted into ${tableName}db`);
      }
    });
  }
};

export { insertData };
