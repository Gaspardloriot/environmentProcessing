"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientDataToSQL = exports.csvParser = void 0;
const getStream = require("get-stream");
const color = require("bash-color");
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = __importDefault(require("csv-parse"));
const index_1 = require("./db/index");
const clientTable_1 = require("./db/clientData/clientTable");
const drop_table_1 = require("./db/utils/drop_table");
const cleanSlate_1 = require("./db/utils/cleanSlate");
const exit_1 = require("./db/utils/exit");
const dataMeta = require("../dataStructures.json");
/**
 * @description parses client data
 * @returns string[] parsed csv file
 */
const csvParser = async (fileName) => {
    const filePath = `./src/${fileName}.csv`;
    let csvData = [];
    let stream = fs_1.default
        .createReadStream(filePath)
        .pipe(csv_parse_1.default({ delimiter: "," }))
        .on("data", (csvrow) => {
        csvrow.unshift("id");
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
const clientDataToSQL = async (fileName, continueCycle) => {
    const formattedData = await csvParser(fileName);
    const database = dataMeta.dataStructures.database;
    if (continueCycle) {
        if (database)
            cleanSlate_1.cleanSlate(database);
        await index_1.launchDatabase(fileName, formattedData);
    }
    if (!continueCycle) {
        if (database) {
            await drop_table_1.drop_table(database, dataMeta.dataStructures.clientData.table);
            clientTable_1.createClientTable(database.substring(0, database.length - 2), formattedData, continueCycle);
        }
        else {
            console.log(color.wrap("\nNO EXISTING DATABASE", color.colors.RED));
            exit_1.exitProcess();
        }
    }
};
exports.clientDataToSQL = clientDataToSQL;
