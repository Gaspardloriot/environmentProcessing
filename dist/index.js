"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = __importDefault(require("csv-parse"));
const csvParser = () => {
    const filePath = "./src/data.csv";
    let csvData = [];
    fs_1.default.createReadStream(filePath)
        .pipe(csv_parse_1.default({ delimiter: "," }))
        .on("data", function (csvrow) {
        csvData.push(csvrow);
    })
        .on("end", function () {
        console.log(csvData[5003]);
    });
};
csvParser();
