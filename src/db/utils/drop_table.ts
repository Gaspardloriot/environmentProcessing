const color = require("bash-color");
import { db } from "../index";

const drop_table = (database: string, toDrop: string) => {
  const sql: string = `drop table ${database}.${toDrop}`;
  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      console.log(
        "TABLE",
        color.wrap(`${toDrop}`, color.colors.RED),
        "DROP.....",
        color.wrap("DONE", color.colors.GREEN)
      );
    }
  });
};

export { drop_table };
