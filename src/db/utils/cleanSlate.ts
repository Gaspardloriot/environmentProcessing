const color = require("bash-color");
const jsonfile = require("jsonfile");
import { db } from "../index";

const cleanSlate = async (database: string) => {
  const dataMetaPath: string = "../../../dataStructures.json";
  await jsonfile.writeFile(dataMetaPath, emptyDataStructures);
  const sql: string = `DROP DATABASE IF EXISTS ${database}`;
  await db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      console.log(
        "DATABASE",
        color.wrap(`${database}`, color.colors.RED),
        "DROP.....",
        color.wrap("DONE", color.colors.GREEN)
      );
    }
  });
};

const emptyDataStructures = {
  dataStructures: {
    database: "filedb",
    clientData: { table: "file_clientTable", uploaded: true },
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

export { cleanSlate };
