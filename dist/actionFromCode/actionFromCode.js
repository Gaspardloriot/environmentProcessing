"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionFromCode = void 0;
const dataMeta = require("../../dataStructures.json");
const prompt_1 = require("../prompt/prompt");
const cleanSlate_1 = require("../db/utils/cleanSlate");
const actionFromCode = async (code) => {
    switch (code) {
        case 1:
            prompt_1.getFilename(true);
            break;
        case 2:
            prompt_1.getFilename(false);
            break;
        case 3:
            prompt_1.selectTableImport();
            break;
        case 4:
            cleanSlate_1.cleanSlate(dataMeta.dataStructures.database, false);
            break;
        default:
            process.exit(0);
    }
};
exports.actionFromCode = actionFromCode;
