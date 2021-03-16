"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestCarbon = void 0;
const color = require("bash-color");
const index_1 = require("../../index");
const drop_table_1 = require("../../utils/drop_table");
const fossil_capexTc3_1 = require("../fossil_capex/fossil_capexTc3");
const dataMeta = require("../../../../dataStructures.json");
const getLatestCarbon = () => {
    const database = dataMeta.dataStructures.database;
    const table = "latest_carbon";
    const tc2 = dataMeta.dataStructures.trucostData.table2.table;
    const sql = `CREATE TABLE ${database}.${table} AS
  (SELECT 
    Carbon_Scope_3_Upstream_tCO2e,
    Carbon_Scope_3_Downstream_tCO2e, 
    TCUID, max(Financial_Year) as Latest_year_Scope3,
    identifier,
    Revenue_USD_mn
  FROM ${database}.${tc2}
  GROUP BY TCUID)
  `;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log("TABLE", color.wrap(`${table}`, color.colors.CYAN), "CREATE.....", color.wrap("DONE", color.colors.GREEN));
        }
        appendTc2Carbon(database, table);
    });
};
exports.getLatestCarbon = getLatestCarbon;
const appendTc2Carbon = (database, tc2) => {
    const table = "project_table_2";
    const newTable = "project_data_3";
    const sql = `CREATE TABLE ${database}.${newTable} AS
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
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log("TABLE", color.wrap(`${newTable}`, color.colors.CYAN), "CREATE.....", color.wrap("DONE", color.colors.GREEN));
        }
        drop_table_1.drop_table(database, tc2);
        drop_table_1.drop_table(database, table);
        fossil_capexTc3_1.appendTc3fossil_capex(database, newTable);
    });
};
