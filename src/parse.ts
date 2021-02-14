import fs from "fs";
import parse from "csv-parse";
const getStream = require("get-stream");
import { launchDatabase } from "./db/index";

/**
 * @description parses client data
 * @returns string[] parsed csv file
 */
const csvParser = async (fileName: string): Promise<string[]> => {
  const filePath: string = `./src/${fileName}.csv`;

  let csvData: string[] = [];

<<<<<<< HEAD
  let stream = fs
    .createReadStream(filePath)
    .pipe(parse({ delimiter: "," }))
    .on("data", (csvrow) => {
=======
  const stream = fs
    .createReadStream(filePath)
    .pipe(parse({ delimiter: "," }))
    .on("data", (csvrow: string) => {
>>>>>>> main
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
