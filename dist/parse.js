"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientDataToSQL = exports.csvParser = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = __importDefault(require("csv-parse"));
const getStream = require("get-stream");
const index_1 = require("./db/index");
/**
 * @description parses client data
 * @returns string[] parsed csv file
 */
const csvParser = async (fileName) => {
    const filePath = `./src/${fileName}.csv`;
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
const clientDataToSQL = async (fileName) => {
    const formattedData = await csvParser(fileName);
    await index_1.launchDatabase(fileName, formattedData);
};
exports.clientDataToSQL = clientDataToSQL;
