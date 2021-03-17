const color = require("bash-color");
import { db } from "../../index";
import { drop_table } from "../../utils/drop_table";
import { callTc7extractivesEnergy } from "../extractives_energy_revenue/extractives_energyTc7";
const dataMeta = require("../../../../dataStructures.json");

const appendTc3energy_generation = (database: string, toDrop: string) => {
  const tc3: string = dataMeta.dataStructures.trucostData.table3.table;
  const table: string = "project_table_5";
  const sql: string = `CREATE TABLE ${database}.${table} AS
    
      (select ${database}.${toDrop}.*, 
        ${database}.${tc3}.Coal_Power_Generation_GWh,
        ${database}.${tc3}.Natural_Gas_Power_Generation_GWh,
        ${database}.${tc3}.LPG_Power_Generation_GWh,
        ${database}.${tc3}.Petroleum_Power_Generation_GWh,
        ${database}.${tc3}.LNG_Power_Generation_GWh,
        ${database}.${tc3}.Wind_Power_Generation_GWh,
        ${database}.${tc3}.Solar_Power_Generation_GWh,
        ${database}.${tc3}.Biomass_Power_Generation_GWh,
        ${database}.${tc3}.Geothermal_Power_Generation_GWh,
        ${database}.${tc3}.Wave_AND_Tidal_Power_Generation_GWh,
        ${database}.${tc3}.Hydroelectric_Power_Generation_GWh,
        ${database}.${tc3}.Nuclear_Power_Generation_GWh,
        ${database}.${tc3}.Landfill_Gas_Power_Generation_GWh,
        ${database}.${tc3}.Other_Power_Generation_GWh,

        ${database}.${tc3}.Coal_Power_Generation_GWh
        + ${database}.${tc3}.Natural_Gas_Power_Generation_GWh
        + ${database}.${tc3}.LPG_Power_Generation_GWh
        + ${database}.${tc3}.Petroleum_Power_Generation_GWh
        + ${database}.${tc3}.LNG_Power_Generation_GWh AS Total_FossilFuel_Power_Generation_GWh,

        ${database}.${tc3}.Wind_Power_Generation_GWh
        + ${database}.${tc3}.Solar_Power_Generation_GWh
        + ${database}.${tc3}.Biomass_Power_Generation_GWh
        + ${database}.${tc3}.Geothermal_Power_Generation_GWh
        + ${database}.${tc3}.Wave_AND_Tidal_Power_Generation_GWh
        + ${database}.${tc3}.Hydroelectric_Power_Generation_GWh AS Total_Renewable_Power_Generation_GWh,

        ${database}.${tc3}.Nuclear_Power_Generation_GWh
        + ${database}.${tc3}.Landfill_Gas_Power_Generation_GWh
        + ${database}.${tc3}.Other_Power_Generation_GWh AS Total_Other_Power_Generation_GWh

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
    callTc7extractivesEnergy(database, table);
  });
};

export { appendTc3energy_generation };
