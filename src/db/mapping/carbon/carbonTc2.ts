const color = require("bash-color");
import { db } from "../../index";
import { drop_table } from "../../utils/drop_table";
import { appendTc3fossil_capex } from "../fossil_capex/fossil_capexTc3";
const dataMeta = require("../../../../dataStructures.json");

const getLatestCarbon = () => {
  const database: string = dataMeta.dataStructures.database;
  const table: string = "latest_carbon";
  const tc2: string = dataMeta.dataStructures.trucostData.table2.table;
  const sql: string = `CREATE TABLE ${database}.${table} AS
  (SELECT 
    Carbon_Scope_3_Upstream_tCO2e,
    Carbon_Scope_3_Downstream_tCO2e, 
    TCUID, max(Financial_Year) as Latest_year_Scope3,
    identifier,
    Revenue_USD_mn
  FROM ${database}.${tc2}
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

const appendTc2Carbon = (database: string, tc2: string) => {
  const table: string = "project_table_2";
  const newTable: string = "project_data_3";
  const sql: string = `CREATE TABLE ${database}.${newTable} AS
  (SELECT 
    ${database}.${table}.*,
    ${database}.${tc2}.Latest_year_Scope3,
    ${database}.${tc2}.Carbon_Scope_3_Upstream_tCO2e,
    ${database}.${tc2}.Carbon_Scope_3_Downstream_tCO2e, 
    ${database}.${tc2}.Revenue_USD_mn AS Scope_3_Latest_Revenue_USDm,
    ${database}.${tc2}.Carbon_Scope_3_Downstream_tCO2e / ${database}.${table}.Revenue_CRNCYm AS Scope_3DS_C_DIV_R_Intensity
  FROM ${database}.${table}
  LEFT JOIN ${database}.${tc2}
  ON ${database}.${tc2}.TCUID = ${database}.${table}.Trucost_UID);
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
    drop_table(database, tc2);
    drop_table(database, table);
    appendTc3fossil_capex(database, newTable);
  });
};

export { getLatestCarbon };
