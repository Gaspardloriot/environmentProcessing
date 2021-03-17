"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExtractivesAndPG = void 0;
const color = require("bash-color");
const index_1 = require("../../index");
const drop_table_1 = require("../../utils/drop_table");
const constants_1 = require("./constants");
const calculateExtractivesAndPG = (database, toDrop) => {
    const newTable = "project_table_25";
    const sql = `CREATE TABLE ${database}.${newTable} AS
    
      (SELECT ${database}.${toDrop}.*, 

        ${database}.${toDrop}.${constants_1.trucostSector_code[3].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[4].description} AS Total_Coal_Extraction_Revenue_Percentage,
         
        ${database}.${toDrop}.${constants_1.trucostSector_code[0].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[1].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[2].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[3].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[4].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[5].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[6].description} AS Total_Extraction_Revenue_Percentage,

        ${database}.${toDrop}.${constants_1.trucostSector_code[7].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[8].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[9].description} AS Total_Fossil_Fuel_Power_Generation_Revenue_Percentage,

        ${database}.${toDrop}.${constants_1.trucostSector_code[10].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[11].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[12].description} AS Total_Other_Power_Generation_Revenue_Percentage,

        ${database}.${toDrop}.${constants_1.trucostSector_code[13].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[14].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[15].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[16].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[17].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[18].description} AS Total_Renewable_Power_Generation_Revenue_Percentage,

        ${database}.${toDrop}.${constants_1.trucostSector_code[7].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[8].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[9].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[10].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[11].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[12].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[13].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[14].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[15].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[16].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[17].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[18].description} AS Total_Power_Generation_Revenue_Percentage,

        ${database}.${toDrop}.${constants_1.trucostSector_code[0].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[1].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[2].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[3].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[4].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[5].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[6].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[7].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[8].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[9].description} AS Total_Fossil_Fuel_E_And_PG_Revenue_Percentage,

        ${database}.${toDrop}.${constants_1.trucostSector_code[3].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[4].description}
        + ${database}.${toDrop}.${constants_1.trucostSector_code[7].description} AS Total_Coal_E_And_PG_Revenue_Percentage 

        FROM ${database}.${toDrop});
      `;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log("TABLE", color.wrap(`${newTable}`, color.colors.CYAN), "CREATE.....", color.wrap("DONE", color.colors.GREEN));
        }
        drop_table_1.drop_table(database, toDrop);
    });
};
exports.calculateExtractivesAndPG = calculateExtractivesAndPG;
