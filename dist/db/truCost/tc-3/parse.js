"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsedTcOne = void 0;
const parse_1 = require("../../../parse");
const insert_data_1 = require("./insert_data");
/**
 * @description parses csv data into an array
 * @param fileName name of client data used to ref and id the trucost table name
 * @returns void
 */
const parsedTcOne = async (fileName, continueCycle) => {
    const fullFileName = `${fileName}_tc_3`;
    const formattedData = await parse_1.csvParser(fullFileName);
    insert_data_1.insertDataTcOne(fileName, formattedData, continueCycle);
};
exports.parsedTcOne = parsedTcOne;
