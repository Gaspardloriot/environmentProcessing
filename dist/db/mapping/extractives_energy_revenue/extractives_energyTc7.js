"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callTc7extractivesEnergy = void 0;
const color = require("bash-color");
const index_1 = require("../../index");
const drop_table_1 = require("../../utils/drop_table");
const constants_1 = require("./constants");
const extractives_energy_calculations_1 = require("./extractives_energy_calculations");
const dataMeta = require("../../../../dataStructures.json");
const callTc7extractivesEnergy = (database, currentProjectTable) => {
    constants_1.trucostSector_code.forEach((gicsObject, index) => {
        const currentProjectTableNumber = parseInt(currentProjectTable.slice(-1));
        const tableToCreate = `project_table_${(index +
            currentProjectTableNumber +
            1).toString()}`;
        const tableToDrop = `project_table_${(index + currentProjectTableNumber).toString()}`;
        appendTc7extractivesEnergy(database, tableToDrop, tableToCreate, gicsObject.code, gicsObject.description);
    });
};
exports.callTc7extractivesEnergy = callTc7extractivesEnergy;
const appendTc7extractivesEnergy = (database, toDrop, toCreate, codeValue, columnName) => {
    const tc7 = dataMeta.dataStructures.trucostData.table7.table;
    const sql = `CREATE TABLE ${database}.${toCreate} AS
  
    (SELECT ${database}.${toDrop}.*, 
      ${database}.${tc7}.Trucost_Sector_Revenue_Percentage AS ${columnName}
        
      FROM ${database}.${toDrop}
      LEFT JOIN ${database}.${tc7} 
      ON concat(${database}.${toDrop}.identifier,'${codeValue}') = ${database}.${tc7}.identifier);
    `;
    index_1.db.query(sql, (err) => {
        if (err)
            throw err;
        else {
            console.log("TABLE", color.wrap(`${toCreate}`, color.colors.CYAN), "CREATE.....", color.wrap("DONE", color.colors.GREEN));
        }
        drop_table_1.drop_table(database, toDrop);
        if (parseInt(toCreate.slice(-2)) === constants_1.trucostSector_code.length + 5) {
            extractives_energy_calculations_1.calculateExtractivesAndPG(database, toCreate);
        }
    });
};
