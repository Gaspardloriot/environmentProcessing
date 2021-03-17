"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject_data = void 0;
const color = require("bash-color");
const index_1 = require("../../index");
const drop_table_1 = require("../../utils/drop_table");
const carbonTc2_1 = require("./carbonTc2");
const dataMeta = require("../../../../dataStructures.json");
const createProject_data = () => {
    const database = dataMeta.dataStructures.database;
    const project_data_1 = "project_data_1";
    const table = dataMeta.dataStructures.clientData.table;
    const sql = `create table ${database}.${project_data_1} AS

  (SELECT * from ${database}.${table});
  `;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log("TABLE", color.wrap(`${project_data_1}`, color.colors.CYAN), "CREATE.....", color.wrap("DONE", color.colors.GREEN));
            appendTc1Carbon(database, project_data_1);
        }
    });
};
exports.createProject_data = createProject_data;
const appendTc1Carbon = (database, toDrop) => {
    const tc1 = dataMeta.dataStructures.trucostData.table1.table;
    const table = "project_table_2";
    const sql = `CREATE TABLE ${database}.${table} AS

  (select ${database}.${toDrop}.*,
    ${database}.${tc1}.GICS_Sector_Code,
    ${database}.${tc1}.GICS_Sector_Name,
    ${database}.${tc1}.GICS_Industry_Group_Code,
    ${database}.${tc1}.GICS_Industry_Group_Name,
    ${database}.${tc1}.GICS_Industry_Code,
    ${database}.${tc1}.GICS_Industry_Name,
    ${database}.${tc1}.GICS_Sub_Industry_Code,
    ${database}.${tc1}.GICS_Sub_Industry_Name,
    ${database}.${tc1}.GICS_Description,
    ${database}.${tc1}.Country,
    ${database}.${tc1}.Carbon_Scope_1_tonnes_CO2e,
    ${database}.${tc1}.Carbon_Scope_2_tonnes_CO2e,
    ${database}.${tc1}.Carbon_Scope_3_tonnes_CO2e AS Carbon_Scope_3US_tonnes_CO2e,
    ${database}.${tc1}.Carbon_Direct_tonnes_CO2e,
    ${database}.${tc1}.Carbon_First_Tier_Indirect_tonnes_CO2e,
    ${database}.${tc1}.Carbon_DirectPLUSFirst_Tier_Indirect_tCO2e,
    ${database}.${tc1}.Carbon_Disclosure,
    ${database}.${tc1}.Carbon_Scope_1_tonnes_CO2e / ${database}.${toDrop}.Revenue_CRNCYm AS Scope_1_C_DIV_R_Intensity,
    ${database}.${tc1}.Carbon_Scope_2_tonnes_CO2e / ${database}.${toDrop}.Revenue_CRNCYm AS Scope_2_C_DIV_R_Intensity,
    ${database}.${tc1}.Carbon_Scope_3_tonnes_CO2e / ${database}.${toDrop}.Revenue_CRNCYm AS Scope_3US_C_DIV_R_Intensity,
    ${database}.${tc1}.Carbon_Direct_tonnes_CO2e / ${database}.${toDrop}.Revenue_CRNCYm  AS Direct_C_DIV_R_Intensity,
    ${database}.${tc1}.Carbon_First_Tier_Indirect_tonnes_CO2e / ${database}.${toDrop}.Revenue_CRNCYm AS First_Tier_C_DIV_R_Intensity,
    ${database}.${tc1}.Carbon_DirectPLUSFirst_Tier_Indirect_tCO2e / ${database}.${toDrop}.Revenue_CRNCYm  AS DirectPLUSFirst_Tier_DIV_R_Intensity

   from ${database}.${tc1}, ${database}.${toDrop} where ${database}.${tc1}.identifier = ${database}.${toDrop}.identifier);
  `;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log("TABLE", color.wrap(`${table}`, color.colors.CYAN), "CREATE.....", color.wrap("DONE", color.colors.GREEN));
        }
        drop_table_1.drop_table(database, toDrop);
        carbonTc2_1.getLatestCarbon();
    });
};
