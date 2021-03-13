const color = require("bash-color");
import { db } from "../../index";
import { drop_table } from "../../utils/drop_table";
const dataMeta = require("../../../../dataStructures.json");

const getLatestCarbon = () => {
  const database: string = dataMeta.dataStructures.database;
  const table: string = "latest_carbon";
  const sourceTable: string = dataMeta.dataStructures.trucostData.table2.table;
  const sql: string = `CREATE TABLE ${database}.${table} AS
  (SELECT 
    Carbon_Scope_3_Upstream_tCO2e,
    Carbon_Scope_3_Downstream_tCO2e, 
    TCUID, max(Financial_Year) as Latest_year_Scope3,
    identifier,
    Revenue_USD_mn
  FROM ${database}.${sourceTable}
  GROUP BY TCUID)
  `;

  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      console.log(
        "TABLE",
        color.wrap(`${table}`, color.colors.CYAN),
        "CREATE.....",
        color.wrap("DONE", color.colors.GREEN)
      );
    }
    appendTc2Carbon(database, table);
  });
};

const appendTc2Carbon = (database: string, sourceTable: string) => {
  const table: string = "project_table_2";
  const newTable: string = "project_data_3";
  const sql: string = `CREATE TABLE ${database}.${newTable} AS
  (SELECT 
    ${database}.${table}.*,
    ${database}.${sourceTable}.Carbon_Scope_3_Upstream_tCO2e,
    ${database}.${sourceTable}.Carbon_Scope_3_Downstream_tCO2e, 
    ${database}.${sourceTable}.Revenue_USD_mn, 
    ${database}.${sourceTable}.Latest_year_Scope3
  FROM ${database}.${table}
  LEFT JOIN ${database}.${sourceTable}
  ON ${database}.${sourceTable}.TCUID = ${database}.${table}.Trucost_UID);
  `;
  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      console.log(
        "TABLE",
        color.wrap(`${newTable}`, color.colors.CYAN),
        "CREATE.....",
        color.wrap("DONE", color.colors.GREEN)
      );
    }
    drop_table(database, sourceTable);
    drop_table(database, table);
  });
};

export { getLatestCarbon };
