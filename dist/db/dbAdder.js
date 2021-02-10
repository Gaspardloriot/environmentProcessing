"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refDatabase = void 0;
const jsonfile = require("jsonfile");
const dataStructuresMeta = require("../../dataStructures.json");
const file = "./dataStructures.json";
const refDatabase = (filename) => {
    if (dataStructuresMeta.dataStructures.database === null) {
        const database = `${filename}db`;
        const tableName = `${filename}_clientTable`;
        let changedFile = dataStructuresMeta;
        changedFile.dataStructures.database = database;
        changedFile.dataStructures.clientData.table = tableName;
        changedFile.dataStructures.clientData.uploaded = true;
        jsonfile.writeFile(file, changedFile, function (err) {
            if (err)
                console.error(err);
        });
    }
};
exports.refDatabase = refDatabase;
