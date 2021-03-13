const color = require("bash-color");
import { db } from "../../index";
import { drop_table } from "../../utils/drop_table";
import { getLatestCarbon } from "./carbonTc2";
const dataMeta = require("../../../../dataStructures.json");

const createProject_data = () => {
  const database: string = dataMeta.dataStructures.database;
  const project_data_1: string = "project_data_1";
  const table: string = dataMeta.dataStructures.clientData.table;
  const sql: string = `create table ${database}.${project_data_1} AS

  (SELECT * from ${database}.${table});
  `;

  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      console.log(
        "TABLE",
        color.wrap(`${project_data_1}`, color.colors.CYAN),
        "CREATE.....",
        color.wrap("DONE", color.colors.GREEN)
      );
      appendTc1Carbon(database, project_data_1);
    }
  });
};

const appendTc1Carbon = (database: string, toDrop: string) => {
  const tc1: string = dataMeta.dataStructures.trucostData.table1.table;
  const table: string = "project_table_2";
  const sql: string = `CREATE TABLE ${database}.${table} AS

  (select ${database}.${toDrop}.*, 
    ${database}.${tc1}.Carbon_Scope_1_tonnes_CO2e,
    ${database}.${tc1}.Carbon_Scope_2_tonnes_CO2e,
    ${database}.${tc1}.Carbon_Scope_3_tonnes_CO2e,
    ${database}.${tc1}.Carbon_Direct_tonnes_CO2e,
    ${database}.${tc1}.Carbon_First_Tier_Indirect_tonnes_CO2e,
    ${database}.${tc1}.Carbon_DirectPLUSFirst_Tier_Indirect_tCO2e,
    ${database}.${tc1}.Carbon_Disclosure
   from ${database}.${tc1}, ${database}.${toDrop} where ${database}.${tc1}.identifier = ${database}.${toDrop}.identifier);
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
    drop_table(database, toDrop);
    getLatestCarbon();
  });
};

export { createProject_data };
