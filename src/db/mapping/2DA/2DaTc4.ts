const color = require("bash-color");
import { db } from "../../index";
import { drop_table } from "../../utils/drop_table";
import { appendTc52CEAR } from "../CEAR/CEARTc5";
const dataMeta = require("../../../../dataStructures.json");

const appendTc42Da = (database: string, toDrop: string) => {
  const tc4: string = dataMeta.dataStructures.trucostData.table4.table;
  const newTable: string = "project_table_26";
  const sql: string = `CREATE TABLE ${database}.${newTable} AS
      
        (SELECT ${database}.${toDrop}.*, 
          IF (${database}.${tc4}.identifier IS NOT NULL,1,0) AS Coverage_2DA,
          ${database}.${tc4}.Annual_Report_Year,
             ${database}.${tc4}.Methodology,
             ${database}.${tc4}.Intensity_unit,
             ${database}.${tc4}.Base_year,
             ${database}.${tc4}.Horizon_year,
             ${database}.${tc4}.Source_of_forward_looking_data,
             ${database}.${tc4}.tCO2e_under_OR_over_1_5C_or_1_75C_carbon_budget_2012_2025,
             ${database}.${tc4}.tCO2e_under_OR_over_2C_carbon_budget_2012_2025,
             ${database}.${tc4}.tCO2e_under_OR_over_2_7C_or_3C_carbon_budget_2012_2025,
             ${database}.${tc4}.tCO2e_under_OR_over_4C_carbon_budget_2012_2025,
             ${database}.${tc4}.tCO2e_under_OR_over_5C_carbon_budget_2012_2025,
             ${database}.${tc4}.Alignment_base_year_horizon_year,
             ${database}.${tc4}.2012_Company_Emissions,
             ${database}.${tc4}.2012_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2012_2C_Aligned_Emissions,
             ${database}.${tc4}.2013_Company_Emissions,
             ${database}.${tc4}.2013_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2013_2C_Aligned_Emissions,
             ${database}.${tc4}.2014_Company_Emissions,
             ${database}.${tc4}.2014_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2014_2C_Aligned_Emissions,
             ${database}.${tc4}.2015_Company_Emissions,
             ${database}.${tc4}.2015_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2015_2C_Aligned_Emissions,
             ${database}.${tc4}.2016_Company_Emissions,
             ${database}.${tc4}.2016_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2016_2C_Aligned_Emissions,
             ${database}.${tc4}.2017_Company_Emissions,
             ${database}.${tc4}.2017_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2017_2C_Aligned_Emissions,
             ${database}.${tc4}.2018_Company_Emissions,
             ${database}.${tc4}.2018_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2018_2C_Aligned_Emissions,
             ${database}.${tc4}.2019_Company_Emissions,
             ${database}.${tc4}.2019_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2019_2C_Aligned_Emissions,
             ${database}.${tc4}.2020_Company_Emissions,
             ${database}.${tc4}.2020_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2020_2C_Aligned_Emissions,
             ${database}.${tc4}.2021_Company_Emissions,
             ${database}.${tc4}.2021_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2021_2C_Aligned_Emissions,
             ${database}.${tc4}.2022_Company_Emissions,
             ${database}.${tc4}.2022_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2022_2C_Aligned_Emissions,
             ${database}.${tc4}.2023_Company_Emissions,
             ${database}.${tc4}.2023_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2023_2C_Aligned_Emissions,
             ${database}.${tc4}.2024_Company_Emissions,
             ${database}.${tc4}.2024_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2024_2C_Aligned_Emissions,
             ${database}.${tc4}.2025_Company_Emissions,
             ${database}.${tc4}.2025_Well_Below_2C_Aligned_Emissions,
             ${database}.${tc4}.2025_2C_Aligned_Emissions
          
  
          FROM ${database}.${toDrop}
          LEFT JOIN ${database}.${tc4} 
          ON ${database}.${tc4}.TCUID = ${database}.${toDrop}.Trucost_UID);
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
    appendTc52CEAR(database, newTable);
  });
};

export { appendTc42Da };
