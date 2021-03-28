import { db } from "../index";
const dataMeta = require("../../../dataStructures.json");
import { getProjectTableInCsv } from "./projectTableCsv";
const getProjectTable = () => {
  const database: string = dataMeta.dataStructures.database;
  const sql: string = `SELECT * FROM ${database}.PROJECT_DATA_FINAL`;

  db.query(sql, (err: string, res: string) => {
    if (err) throw err;
    else if (res) {
      getProjectTableInCsv(res);
    }
  });
};

export { getProjectTable };
