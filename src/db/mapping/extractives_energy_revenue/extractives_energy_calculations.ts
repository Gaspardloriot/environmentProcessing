const color = require("bash-color");
import { db } from "../../index";
import { drop_table } from "../../utils/drop_table";
import { trucostSector_code } from "./constants";

const calculateExtractivesAndPG = (database: string, toDrop: string) => {
  const newTable: string = "project_table_25";
  const sql: string = `CREATE TABLE ${database}.${newTable} AS
    
      (SELECT ${database}.${toDrop}.*, 

        ${database}.${toDrop}.${trucostSector_code[3].description}
        + ${database}.${toDrop}.${trucostSector_code[4].description} AS Total_Coal_Extraction_Revenue_Percentage,
         
        ${database}.${toDrop}.${trucostSector_code[0].description}
        + ${database}.${toDrop}.${trucostSector_code[1].description}
        + ${database}.${toDrop}.${trucostSector_code[2].description}
        + ${database}.${toDrop}.${trucostSector_code[3].description}
        + ${database}.${toDrop}.${trucostSector_code[4].description}
        + ${database}.${toDrop}.${trucostSector_code[5].description}
        + ${database}.${toDrop}.${trucostSector_code[6].description} AS Total_Extraction_Revenue_Percentage,

        ${database}.${toDrop}.${trucostSector_code[7].description}
        + ${database}.${toDrop}.${trucostSector_code[8].description}
        + ${database}.${toDrop}.${trucostSector_code[9].description} AS Total_Fossil_Fuel_Power_Generation_Revenue_Percentage,

        ${database}.${toDrop}.${trucostSector_code[10].description}
        + ${database}.${toDrop}.${trucostSector_code[11].description}
        + ${database}.${toDrop}.${trucostSector_code[12].description} AS Total_Other_Power_Generation_Revenue_Percentage,

        ${database}.${toDrop}.${trucostSector_code[13].description}
        + ${database}.${toDrop}.${trucostSector_code[14].description}
        + ${database}.${toDrop}.${trucostSector_code[15].description}
        + ${database}.${toDrop}.${trucostSector_code[16].description}
        + ${database}.${toDrop}.${trucostSector_code[17].description}
        + ${database}.${toDrop}.${trucostSector_code[18].description} AS Total_Renewable_Power_Generation_Revenue_Percentage,

        ${database}.${toDrop}.${trucostSector_code[7].description}
        + ${database}.${toDrop}.${trucostSector_code[8].description}
        + ${database}.${toDrop}.${trucostSector_code[9].description}
        + ${database}.${toDrop}.${trucostSector_code[10].description}
        + ${database}.${toDrop}.${trucostSector_code[11].description}
        + ${database}.${toDrop}.${trucostSector_code[12].description}
        + ${database}.${toDrop}.${trucostSector_code[13].description}
        + ${database}.${toDrop}.${trucostSector_code[14].description}
        + ${database}.${toDrop}.${trucostSector_code[15].description}
        + ${database}.${toDrop}.${trucostSector_code[16].description}
        + ${database}.${toDrop}.${trucostSector_code[17].description}
        + ${database}.${toDrop}.${trucostSector_code[18].description} AS Total_Power_Generation_Revenue_Percentage,

        ${database}.${toDrop}.${trucostSector_code[0].description}
        + ${database}.${toDrop}.${trucostSector_code[1].description}
        + ${database}.${toDrop}.${trucostSector_code[2].description}
        + ${database}.${toDrop}.${trucostSector_code[3].description}
        + ${database}.${toDrop}.${trucostSector_code[4].description}
        + ${database}.${toDrop}.${trucostSector_code[5].description}
        + ${database}.${toDrop}.${trucostSector_code[6].description}
        + ${database}.${toDrop}.${trucostSector_code[7].description}
        + ${database}.${toDrop}.${trucostSector_code[8].description}
        + ${database}.${toDrop}.${trucostSector_code[9].description} AS Total_Fossil_Fuel_E_And_PG_Revenue_Percentage,

        ${database}.${toDrop}.${trucostSector_code[3].description}
        + ${database}.${toDrop}.${trucostSector_code[4].description}
        + ${database}.${toDrop}.${trucostSector_code[7].description} AS Total_Coal_E_And_PG_Revenue_Percentage 

        FROM ${database}.${toDrop});
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
  });
};

export { calculateExtractivesAndPG };
