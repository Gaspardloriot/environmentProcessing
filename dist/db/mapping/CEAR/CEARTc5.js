"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendTc52CEAR = void 0;
const color = require("bash-color");
const index_1 = require("../../index");
const drop_table_1 = require("../../utils/drop_table");
const PRTc6_1 = require("../PR/PRTc6");
const dataMeta = require("../../../../dataStructures.json");
const appendTc52CEAR = (database, toDrop) => {
    const tc5 = dataMeta.dataStructures.trucostData.table5.table;
    const newTable = "project_table_27";
    const sql = `CREATE TABLE ${database}.${newTable} AS
      
        (SELECT ${database}.${toDrop}.*, 
          IF (${database}.${tc5}.identifier IS NOT NULL,1,0) AS Coverage_CEAR,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_Low_2020,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_Low_2025,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_Low_2030,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_Low_2040,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_Low_2050,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_Medium_2020,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_Medium_2025,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_Medium_2030,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_Medium_2040,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_Medium_2050,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_High_2020,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_High_2025,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_High_2030,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_High_2040,
              ${database}.${tc5}.Unpriced_Carbon_Cost_USD_High_2050,
              ${database}.${tc5}.Unpriced_Carbon_Cost_adjusted_EBIT_USD_High_2030,
              ${database}.${tc5}.Unpriced_Carbon_Cost_adjusted_EBITDA_USD_High_2030,
              ${database}.${tc5}.Unpriced_Carbon_Cost_as_PERCENT_of_EBIT_High_2030,
              ${database}.${tc5}.Unpriced_Carbon_Cost_as_PERCENT_of_EBITDA_High_2030,
              ${database}.${tc5}.Reduction_of_EBIT_Margin_PERCENT_points_High_2030,
              ${database}.${tc5}.Reduction_of_EBITDA_Margin_PERCENT_points_High_2030,
              ${database}.${tc5}.EBIT_at_risk_SUPERIOR_10PERCENT_High_2030,
              ${database}.${tc5}.EBITDA_at_risk_SUPERIOR_10PERCENT_High_2030,
              ${database}.${tc5}.Unpriced_Carbon_Cost_adjusted_EBIT_USD_High_2040,
              ${database}.${tc5}.Unpriced_Carbon_Cost_adjusted_EBITDA_USD_High_2040,
              ${database}.${tc5}.Unpriced_Carbon_Cost_as_PERCENT_of_EBIT_High_2040,
              ${database}.${tc5}.Unpriced_Carbon_Cost_as_PERCENT_of_EBITDA_High_2040,
              ${database}.${tc5}.Reduction_of_EBIT_Margin_PERCENT_points_High_2040,
              ${database}.${tc5}.Reduction_of_EBITDA_Margin_PERCENT_points_High_2040,
              ${database}.${tc5}.EBIT_at_risk_SUPERIOR_10PERCENT_High_2040,
              ${database}.${tc5}.EBITDA_at_risk_SUPERIOR_10PERCENT_High_2040,
              ${database}.${tc5}.Unpriced_Carbon_Cost_adjusted_EBIT_USD_High_2050,
              ${database}.${tc5}.Unpriced_Carbon_Cost_adjusted_EBITDA_USD_High_2050,
              ${database}.${tc5}.Unpriced_Carbon_Cost_as_PERCENT_of_EBIT_High_2050,
              ${database}.${tc5}.Unpriced_Carbon_Cost_as_PERCENT_of_EBITDA_High_2050,
              ${database}.${tc5}.Reduction_of_EBIT_Margin_PERCENT_points_High_2050,
              ${database}.${tc5}.Reduction_of_EBITDA_Margin_PERCENT_points_High_2050,
              ${database}.${tc5}.EBIT_at_risk_SUPERIOR_10PERCENT_High_2050,
              ${database}.${tc5}.EBITDA_at_risk_SUPERIOR_10PERCENT_High_2050
  
          FROM ${database}.${toDrop}
          LEFT JOIN ${database}.${tc5} 
          ON ${database}.${tc5}.identifier = ${database}.${toDrop}.identifier);
        `;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log("TABLE", color.wrap(`${newTable}`, color.colors.CYAN), "CREATE.....", color.wrap("DONE", color.colors.GREEN));
        }
        drop_table_1.drop_table(database, toDrop);
        PRTc6_1.appendTc6PR(database, newTable);
    });
};
exports.appendTc52CEAR = appendTc52CEAR;
