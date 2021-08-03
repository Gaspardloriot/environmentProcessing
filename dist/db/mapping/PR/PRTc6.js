"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendTc6PR = void 0;
const color = require("bash-color");
const index_1 = require("../../index");
const drop_table_1 = require("../../utils/drop_table");
const getProjectTable_1 = require("../../getProjectTable/getProjectTable");
const dataMeta = require("../../../../dataStructures.json");
const appendTc6PR = (database, toDrop) => {
    const tc6 = dataMeta.dataStructures.trucostData.table6.table;
    const newTable = "project_data_final";
    const sql = `CREATE TABLE ${database}.${newTable} AS
      
        (SELECT ${database}.${toDrop}.*, 
          IF (${database}.${tc6}.identifier IS NOT NULL,1,0) AS Coverage_Physical_Risk,
          ${database}.${tc6}.Data_Quality,
          IFNULL(${database}.${tc6}.Asset_Count,1),

          ${database}.${tc6}.Composite_Low_2020,
          ${database}.${tc6}.Composite_Low_2030,
          ${database}.${tc6}.Composite_Low_2050,
          ${database}.${tc6}.Composite_Moderate_2020,
          ${database}.${tc6}.Composite_Moderate_2030,
          ${database}.${tc6}.Composite_Moderate_2050,
          ${database}.${tc6}.Composite_High_2020,
          ${database}.${tc6}.Composite_High_2030,
          ${database}.${tc6}.Composite_High_2050,

          ${database}.${tc6}.Wildfire_Moderate_2020,
          ${database}.${tc6}.Wildfire_Moderate_2030,
          ${database}.${tc6}.Wildfire_Moderate_2050,
          ${database}.${tc6}.Wildfire_High_2020,
          ${database}.${tc6}.Wildfire_High_2030,
          ${database}.${tc6}.Wildfire_High_2050,

          ${database}.${tc6}.Coldwave_Low_2020,
          ${database}.${tc6}.Coldwave_Low_2030,
          ${database}.${tc6}.Coldwave_Low_2050,
          ${database}.${tc6}.Coldwave_Moderate_2020,
          ${database}.${tc6}.Coldwave_Moderate_2030,
          ${database}.${tc6}.Coldwave_Moderate_2050,
          ${database}.${tc6}.Coldwave_High_2020,
          ${database}.${tc6}.Coldwave_High_2030,
          ${database}.${tc6}.Coldwave_High_2050,

          ${database}.${tc6}.Heatwave_Low_2020,
          ${database}.${tc6}.Heatwave_Low_2030,
          ${database}.${tc6}.Heatwave_Low_2050,
          ${database}.${tc6}.Heatwave_Moderate_2020,
          ${database}.${tc6}.Heatwave_Moderate_2030,
          ${database}.${tc6}.Heatwave_Moderate_2050,
          ${database}.${tc6}.Heatwave_High_2020,
          ${database}.${tc6}.Heatwave_High_2030,
          ${database}.${tc6}.Heatwave_High_2050,

          ${database}.${tc6}.WaterStress_Moderate_2020,
          ${database}.${tc6}.WaterStress_Moderate_2030,
          ${database}.${tc6}.WaterStress_Moderate_2050,
          ${database}.${tc6}.WaterStress_High_2020,
          ${database}.${tc6}.WaterStress_High_2030,
          ${database}.${tc6}.WaterStress_High_2050,

          ${database}.${tc6}.SeaLevelRise_Low_2020,

          ${database}.${tc6}.Flood_Baseline,
          ${database}.${tc6}.Hurricane_Baseline,

          ${database}.${tc6}.SensitivityWeightAdjusted_Composite_Low_2020,
          ${database}.${tc6}.SensitivityWeightAdjusted_Composite_Low_2030,
          ${database}.${tc6}.SensitivityWeightAdjusted_Composite_Low_2050,
          ${database}.${tc6}.SensitivityWeightAdjusted_Composite_Moderate_2020,
          ${database}.${tc6}.SensitivityWeightAdjusted_Composite_Moderate_2030,
          ${database}.${tc6}.SensitivityWeightAdjusted_Composite_Moderate_2050,
          ${database}.${tc6}.SensitivityWeightAdjusted_Composite_High_2020,
          ${database}.${tc6}.SensitivityWeightAdjusted_Composite_High_2030,
          ${database}.${tc6}.SensitivityWeightAdjusted_Composite_High_2050,

          ${database}.${tc6}.SensitivityScore_WaterStress,
          ${database}.${tc6}.SensitivityScore_Wildfire,
          ${database}.${tc6}.SensitivityScore_Heatwave,
          ${database}.${tc6}.SensitivityScore_Coldwave,
          ${database}.${tc6}.SensitivityScore_CoastalFlood,
          ${database}.${tc6}.SensitivityScore_Flood,
          ${database}.${tc6}.SensitivityScore_Hurricane

      FROM ${database}.${toDrop}
      LEFT JOIN ${database}.${tc6} 
      ON ${database}.${tc6}.TCUID = ${database}.${toDrop}.Trucost_UID);
        `;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log("TABLE", color.wrap(`${newTable}`, color.colors.CYAN), "CREATE.....", color.wrap("DONE", color.colors.GREEN));
        }
        drop_table_1.drop_table(database, toDrop);
        addPrimaryKey(database, newTable);
    });
};
exports.appendTc6PR = appendTc6PR;
const addPrimaryKey = (database, table) => {
    const sql = `ALTER TABLE ${database}.${table} ADD CONSTRAINT PRIMKEY PRIMARY KEY (uniqid)`;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            getProjectTable_1.getProjectTable();
            console.log("TABLE", color.wrap(`${table}`, color.colors.CYAN), "ADD PRIMARY KEY..", color.wrap("DONE", color.colors.GREEN));
        }
    });
};
