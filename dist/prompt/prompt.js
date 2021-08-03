"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectTableImport = exports.selectAction = exports.getFilename = void 0;
const prompter = require("prompt");
const color = require("bash-color");
const parse_1 = require("../parse");
const constants_1 = require("./constants");
const actionFromCode_1 = require("../actionFromCode/actionFromCode");
const TrucostTableImport_1 = require("../actionFromCode/TrucostTableImport");
const properties = [
    {
        name: "filename",
        validator: /^[a-zA-Z\s\-]+$/,
        warning: "File name must be only letters, spaces, or dashes",
    },
];
/**
 * @description select one of 5 options of the environmentProcessing
 */
const selectAction = () => {
    console.log(color.wrap("\n\nPlease select an action to perform :\n", color.colors.CYAN));
    const list = require("select-shell")(constants_1.selectConfig);
    process.stdin;
    list
        .option("Trucost + Client Import", 1)
        .option("Client Import", 2)
        .option("Trucost Table Import", 3)
        .option("Clean Slate", 4)
        .list();
    list.on("select", (option) => {
        actionFromCode_1.actionFromCode(option[0].value);
    });
    list.on("cancel", (options) => {
        console.log("Cancel list, " + options.length + " options selected");
        process.exit(0);
    });
};
exports.selectAction = selectAction;
/**
 * @description select one of 7 tables to import
 */
const selectTableImport = () => {
    console.log(color.wrap("\n\nPlease select Table to import :\n", color.colors.CYAN));
    const list = require("select-shell")(constants_1.selectConfig);
    process.stdin;
    list
        .option("tc-1", 1)
        .option("tc-2", 2)
        .option("tc-3", 3)
        .option("tc-4", 4)
        .option("tc-5", 5)
        .option("tc-6", 6)
        .option("tc-7", 7)
        .list();
    list.on("select", (option) => {
        TrucostTableImport_1.TrucostTableImport(option[0].value);
    });
    list.on("cancel", (options) => {
        console.log("Cancel list, " + options.length + " options selected");
        process.exit(0);
    });
};
exports.selectTableImport = selectTableImport;
/**
 * @description gets client Filename to launch Db import process
 * @returns void
 */
const getFilename = (continueCycle) => {
    console.log("please enter filename");
    prompter.start();
    prompter.get(properties, (err, result) => {
        if (err) {
            return onErr(err);
        }
        prompter.stop();
        parse_1.clientDataToSQL(result.filename, continueCycle);
    });
};
exports.getFilename = getFilename;
const onErr = (err) => {
    console.log(err);
};
