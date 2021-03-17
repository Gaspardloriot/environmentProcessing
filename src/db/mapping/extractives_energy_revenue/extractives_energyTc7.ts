const color = require("bash-color");
import { db } from "../../index";
import { drop_table } from "../../utils/drop_table";
import { trucostSector_code } from "./constants";
import { calculateExtractivesAndPG } from "./extractives_energy_calculations";
const dataMeta = require("../../../../dataStructures.json");

const callTc7extractivesEnergy = (
  database: string,
  currentProjectTable: string
) => {
  trucostSector_code.forEach((gicsObject: any, index: number) => {
    const currentProjectTableNumber: number = parseInt(
      currentProjectTable.slice(-1)
    );
    const tableToCreate: string = `project_table_${(
      index +
      currentProjectTableNumber +
      1
    ).toString()}`;
    const tableToDrop: string = `project_table_${(
      index + currentProjectTableNumber
    ).toString()}`;
    appendTc7extractivesEnergy(
      database,
      tableToDrop,
      tableToCreate,
      gicsObject.code,
      gicsObject.description
    );
  });
};

const appendTc7extractivesEnergy = (
  database: string,
  toDrop: string,
  toCreate: string,
  codeValue: string,
  columnName: string
) => {
  const tc7: string = dataMeta.dataStructures.trucostData.table7.table;
  const sql: string = `CREATE TABLE ${database}.${toCreate} AS
  
    (SELECT ${database}.${toDrop}.*, 
      ${database}.${tc7}.Trucost_Sector_Revenue_Percentage AS ${columnName}
        
      FROM ${database}.${toDrop}
      LEFT JOIN ${database}.${tc7} 
      ON concat(${database}.${toDrop}.identifier,'${codeValue}') = ${database}.${tc7}.identifier);
    `;

  db.query(sql, (err: string) => {
    if (err) throw err;
    else {
      console.log(
        "TABLE",
        color.wrap(`${toCreate}`, color.colors.CYAN),
        "CREATE.....",
        color.wrap("DONE", color.colors.GREEN)
      );
    }
    drop_table(database, toDrop);

    if (parseInt(toCreate.slice(-2)) === trucostSector_code.length + 5) {
      calculateExtractivesAndPG(database, toCreate);
    }
  });
};

export { callTc7extractivesEnergy };
