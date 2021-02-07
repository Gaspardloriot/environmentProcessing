import fs from "fs";
import parse from "csv-parse";
const getStream = require("get-stream");

const csvParser = async () => {
  const filePath = "./src/data.csv";
  let csvData: string[] = [];
  const stream = fs
    .createReadStream(filePath)
    .pipe(parse({ delimiter: "," }))
    .on("data", (csvrow: string) => {
      csvData.push(csvrow);
    })
    .on("end", () => {
      const formattedData = csvData;
      return formattedData;
    });

  const formattedData = await getStream.array(stream);
};
export { csvParser };
