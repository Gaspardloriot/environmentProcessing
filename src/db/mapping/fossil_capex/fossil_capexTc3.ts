const color = require("bash-color");
import { db } from "../../index";
import { drop_table } from "../../utils/drop_table";
import { appendTc3energy_generation } from "../energy_generation/energy_generationTc3";
const dataMeta = require("../../../../dataStructures.json");

const appendTc3fossil_capex = (database: string, toDrop: string) => {
  const tc3: string = dataMeta.dataStructures.trucostData.table3.table;
  const table: string = "project_table_4";
  const sql: string = `CREATE TABLE ${database}.${table} AS
  
    (select ${database}.${toDrop}.*, 
      ${database}.${tc3}.Reserves_CO2_emissions_from_Coal_m_tonnes,
      ${database}.${tc3}.Reserves_CO2_emissions_from_Oil_m_tonnes,
      ${database}.${tc3}.Reserves_CO2_emissions_from_Gas_m_tonnes,
      ${database}.${tc3}.Reserves_CO2_emissions_from_Oil_PLUS_Gas_m_tonnes,
      ${database}.${tc3}.Reserves_CO2_emissions_from_Coal_m_tonnes 
      + ${database}.${tc3}.Reserves_CO2_emissions_from_Oil_m_tonnes 
      + ${database}.${tc3}.Reserves_CO2_emissions_from_Gas_m_tonnes 
      + ${database}.${tc3}.Reserves_CO2_emissions_from_Oil_PLUS_Gas_m_tonnes AS Total_CO2_From_Reserves_m_tonnes,

      ${database}.${tc3}.CAPEX_Coal_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate AS CAPEX_Coal_CRNCYm,
      ${database}.${tc3}.CAPEX_Oil_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate AS CAPEX_Oil_CRNCYm,
      ${database}.${tc3}.CAPEX_Gas_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate AS CAPEX_Gas_CRNCYm,
      ${database}.${tc3}.CAPEX_Oil_AND_Gas_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate AS CAPEX_Oil_AND_Gas_CRNCYm,
      ${database}.${tc3}.CAPEX_Other_exploration_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate AS CAPEX_Other_exploration_CRNCYm,

      ${database}.${tc3}.CAPEX_Coal_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate
      + ${database}.${tc3}.CAPEX_Oil_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate
      + ${database}.${tc3}.CAPEX_Gas_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate
      + ${database}.${tc3}.CAPEX_Oil_AND_Gas_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate
      + ${database}.${tc3}.CAPEX_Other_exploration_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate AS CAPEX_Total_CRNCYm,

      (${database}.${tc3}.CAPEX_Coal_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate
      + ${database}.${tc3}.CAPEX_Oil_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate
      + ${database}.${tc3}.CAPEX_Gas_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate
      + ${database}.${tc3}.CAPEX_Oil_AND_Gas_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate
      + ${database}.${tc3}.CAPEX_Other_exploration_m_USD * ${database}.${toDrop}.AccountingDate_ExchangeRate) 
      / ${database}.${toDrop}.Revenue_CRNCYm AS CAPEX_Revenue_Intensity
      
     from ${database}.${toDrop}
     left join ${database}.${tc3} 
     on ${database}.${tc3}.identifier = ${database}.${toDrop}.identifier);
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
    appendTc3energy_generation(database, table);
  });
};

export { appendTc3fossil_capex };
