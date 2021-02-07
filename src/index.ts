import fs from "fs";
import parse from "csv-parse";

const csvParser = () => {
  const filePath = "./src/data.csv";
  let csvData: string[] = [];
  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: "," }))
    .on("data", function (csvrow: string) {
      csvData.push(csvrow);
    })
    .on("end", function () {
      console.log(csvData[15003]);
    });
};

csvParser();
