const getStream = require("get-stream");
const color = require("bash-color");
import fs from "fs";
import parse from "csv-parse";
import { launchDatabase } from "./db/index";
import { createClientTable } from "./db/clientData/clientTable";
import { drop_table } from "./db/utils/drop_table";
import { cleanSlate } from "./db/utils/cleanSlate";
import { exitProcess } from "./db/utils/exit";
const dataMeta = require("../dataStructures.json");

/**
 * @description parses client data
 * @returns string[] parsed csv file
 */
const csvParser = async (fileName: string): Promise<string[]> => {
  const filePath: string = `./src/${fileName}.csv`;

  let csvData: string[] = [];

  let stream = fs
    .createReadStream(filePath)
    .pipe(parse({ delimiter: "," }))
    .on("data", (csvrow) => {
      csvrow.unshift("id");
      csvData.push(csvrow);
    })
    .on("end", () => {
      const formattedData: string[] = csvData;
      return formattedData;
    });

  const formattedData: string[] = await getStream.array(stream);

  return formattedData;
};

const clientDataToSQL = async (
  fileName: string,
  continueCycle: boolean
): Promise<void> => {
  const formattedData: string[] = await csvParser(fileName);
  const database: string = dataMeta.dataStructures.database;
  if (continueCycle) {
    if (database) cleanSlate(database);
    await launchDatabase(fileName, formattedData);
  }
  if (!continueCycle) {
    if (database) {
      await drop_table(database, dataMeta.dataStructures.clientData.table);
      createClientTable(
        database.substring(0, database.length - 2),
        formattedData,
        continueCycle
      );
    } else {
      console.log(color.wrap("\nNO EXISTING DATABASE", color.colors.RED));
      exitProcess();
    }
  }
};

export { csvParser, clientDataToSQL };
