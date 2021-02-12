"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refDatabase = void 0;
const jsonfile = require("jsonfile");
const dataStructuresMeta = require("../../../dataStructures.json");
const filePath = "./dataStructures.json";
/**
 *@description if client data upload is successful, will update data meta
 * @param filename string name of client data file
 * @returns void
 */
const refDatabase = (filename) => {
    const database = `${filename}db`;
    const tableName = `${filename}_clientTable`;
    let changedFile = dataStructuresMeta;
    changedFile.dataStructures.database = database;
    changedFile.dataStructures.clientData.table = tableName;
    changedFile.dataStructures.clientData.uploaded = true;
    jsonfile.writeFile(filePath, changedFile, (err) => {
        if (err)
            console.error(err);
    });
};
exports.refDatabase = refDatabase;
