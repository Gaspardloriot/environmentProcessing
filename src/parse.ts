const getStream = require("get-stream");
import fs from "fs";
import parse from "csv-parse";
import { launchDatabase } from "./db/index";
import { createClientTable } from "./db/clientData/clientTable";
import { drop_table } from "./db/utils/drop_table";
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
  if (database && continueCycle) {
    await launchDatabase(fileName, formattedData);
  } else {
    await drop_table(database, dataMeta.dataStructures.clientData.table);
    createClientTable(
      database.substring(0, database.length - 2),
      formattedData,
      continueCycle
    );
  }
};

export { csvParser, clientDataToSQL };
