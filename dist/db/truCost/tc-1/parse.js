"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsedTcOne = void 0;
const parse_1 = require("../../../parse");
const insert_data_1 = require("./insert_data");
const parsedTcOne = async (fileName) => {
    const fullFileName = `${fileName}_tc_1`;
    const formattedData = await parse_1.csvParser(fullFileName);
    insert_data_1.insertDataTcOne(fileName, formattedData);
};
exports.parsedTcOne = parsedTcOne;
