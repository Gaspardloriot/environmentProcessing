"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refFile = void 0;
const jsonfile = require("jsonfile");
const dataStructuresMeta = require("../../../dataStructures.json");
const file = "./dataStructures.json";
/**
 * @description on success of trucost data migration to sql, metabase will be uploaded
 * @param filename string name of the file which serves as ref for table name for the dataset
 * @param tableNumber string name with number to search the right meta data
 * @returns void
 */
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
