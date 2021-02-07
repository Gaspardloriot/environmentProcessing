"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("./parse");
const index_1 = require("./db/index");
const getData = async () => {
    const data = await parse_1.csvParser();
    console.log(data[4900]);
};
getData();
index_1.launchDatabase();
