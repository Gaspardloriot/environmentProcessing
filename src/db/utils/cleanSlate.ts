const color = require("bash-color");
import fs from "fs";
import { db } from "../index";
import { exitProcess } from "./exit";

const emptyDataStructures = {
  dataStructures: {
    database: null,
    clientData: { table: null, uploaded: false },
    trucostData: {
      table1: { table: null, uploaded: false },
      table2: { table: null, uploaded: false },
      table3: { table: null, uploaded: false },
      table4: { table: null, uploaded: false },
      table5: { table: null, uploaded: false },
      table6: { table: null, uploaded: false },
      table7: { table: null, uploaded: false },
    },
  },
};

const cleanSlate = async (database: string, continueCycle: boolean = true) => {
  const dataMetaPath: string = "dataStructures.json";
  if (!database) database = "placeholderName";
  fs.promises.writeFile(dataMetaPath, JSON.stringify(emptyDataStructures));
  const sql: string = `DROP DATABASE IF EXISTS ${database}`;
  await db.query(sql, (err: string, res: any) => {
    if (err) throw err;
    if (res) {
      console.log(
        "DATABASE",
        color.wrap(`${database}`, color.colors.RED),
        "DROP.....",
        color.wrap("DONE", color.colors.GREEN)
      );
      if (!continueCycle) exitProcess();
    }
  });
};

export { cleanSlate };
