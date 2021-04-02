const dataMeta = require("../../dataStructures.json");
import { db } from "../db/index";
import { createTcOne } from "../db/truCost/tc-1/add_table";
import { createTcTwo } from "../db/truCost/tc-2/add_table";
import { createTcThree } from "../db/truCost/tc-3/add_table";
import { createTcFour } from "../db/truCost/tc-4/add_table";
import { createTcFive } from "../db/truCost/tc-5/add_table";
import { createTcSix } from "../db/truCost/tc-6/add_table";
import { createTcSeven } from "../db/truCost/tc-7/add_table";

const TrucostTableImport = async (tableNumber: number) => {
  const database: string = dataMeta.dataStructures.database;
  const tableString: string = `${database}db_tc${tableNumber}`;
  const sql: string = `DROP TABLE IF EXISTS ${database}.${tableString}`;
  db.query(sql, (err: string, res: any) => {
    if (err) throw err;
    if (res) {
      /*   switch (tableNumber) {
        case 1:
          createTcOne(database, false);
          break;
        case 2:
          createTcTwo(database, false);
          break;
        case 3:
          createTcThree(database, false);
          break;
        case 4:
          createTcFour(database, false);
          break;
        case 5:
          createTcFive(database, false);
          break;
        case 6:
          createTcSix(database, false);
          break;
        case 7:
          createTcSeven(database, false);
          break;
        default:
          process.exit(0);
      }*/
      console.log(res);
    }
  });
};

export { TrucostTableImport };
