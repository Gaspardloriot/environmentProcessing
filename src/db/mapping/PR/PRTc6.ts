const color = require("bash-color");
import { db } from "../../index";
import { drop_table } from "../../utils/drop_table";
const dataMeta = require("../../../../dataStructures.json");

const appendTc6PR = (database: string, toDrop: string) => {
  const tc6: string = dataMeta.dataStructures.trucostData.table6.table;
  const newTable: string = "project_data_final";
  const sql: string = `CREATE TABLE ${database}.${newTable} AS
      
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
    drop_table(database, toDrop);
    addPrimaryKey(database, newTable);
  });
};

const addPrimaryKey = (database: string, table: string) => {
  const sql: string = `ALTER TABLE ${database}.${table} ADD CONSTRAINT PRIMKEY PRIMARY KEY (uniqid)`;
  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      console.log(
        "TABLE",
        color.wrap(`${table}`, color.colors.CYAN),
        "ADD PRIMARY KEY..",
        color.wrap("DONE", color.colors.GREEN)
      );
    }
  });
};
export { appendTc6PR };
