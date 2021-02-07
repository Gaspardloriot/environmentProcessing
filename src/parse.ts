import fs from "fs";
import parse from "csv-parse";
const getStream = require("get-stream");

/**
 * @description parse clien data
 * @returns parsed csv file
 */
const csvParser = async (): Promise<string[]> => {
  const filePath: string = "./src/data.csv";
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
export { csvParser };
