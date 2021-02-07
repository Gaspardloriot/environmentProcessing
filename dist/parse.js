"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvParser = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = __importDefault(require("csv-parse"));
const getStream = require("get-stream");
/**
 * @description parse clien data
 * @returns parsed csv file
 */
const csvParser = async () => {
    const filePath = "./src/data.csv";
    let csvData = [];
    const stream = fs_1.default
        .createReadStream(filePath)
        .pipe(csv_parse_1.default({ delimiter: "," }))
        .on("data", (csvrow) => {
        csvData.push(csvrow);
    })
        .on("end", () => {
        const formattedData = csvData;
        return formattedData;
    });
    const formattedData = await getStream.array(stream);
    return formattedData;
};
exports.csvParser = csvParser;
