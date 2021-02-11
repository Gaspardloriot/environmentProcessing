"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refFile = void 0;
const jsonfile = require("jsonfile");
const dataStructuresMeta = require("../../../dataStructures.json");
const file = "./dataStructures.json";
const refFile = (filename, tableNumber) => {
    const tableName = filename;
    let changedFile = dataStructuresMeta;
    changedFile.dataStructures.trucostData[tableNumber].table = tableName;
    changedFile.dataStructures.trucostData[tableNumber].uploaded = true;
    jsonfile.writeFile(file, changedFile, (err) => {
        if (err)
            console.error(err);
    });
};
exports.refFile = refFile;
