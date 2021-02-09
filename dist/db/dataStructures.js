"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTable = void 0;
const jsonfile = require("jsonfile");
const dataStructuresMeta = require("./dataStructures.json");
const addTable = () => {
    if (dataStructuresMeta.dataStructures.clientData.table === null) {
        const file = "./dataStructures.json";
        const tableName = "hello";
        let changedFile = dataStructuresMeta;
        changedFile.dataStructures.clientData.table = tableName;
        jsonfile.writeFile(file, changedFile, function (err) {
            if (err)
                console.error(err);
        });
    }
};
exports.addTable = addTable;
