import fs from "fs";
import parse from "csv-parse";
const getStream = require("get-stream");
import { launchDatabase } from "./db/index";

/**
 * @description parse clien data
 * @returns parsed csv file
 */
const csvParser = async (fileName: string): Promise<string[]> => {
  const filePath: string = `./src/${fileName}.csv`;

  let csvData: string[] = [];

  const stream = fs
    .createReadStream(filePath)
    .pipe(parse({ delimiter: "," }))
    .on("data", (csvrow: string) => {
      csvData.push(csvrow);
    })
    .on("end", () => {
      const formattedData: string[] = csvData;
      return formattedData;
    });

  const formattedData: string[] = await getStream.array(stream);
  return formattedData;
};

const clientDataToSQL = async (fileName: string): Promise<void> => {
  const formattedData = await csvParser(fileName);
  await launchDatabase(fileName, formattedData);
};

export { csvParser, clientDataToSQL };
