"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrucostTableImport = void 0;
const dataMeta = require("../../dataStructures.json");
const color = require("bash-color");
const drop_table_1 = require("../db/utils/drop_table");
const add_table_1 = require("../db/truCost/tc-1/add_table");
const add_table_2 = require("../db/truCost/tc-2/add_table");
const add_table_3 = require("../db/truCost/tc-3/add_table");
const add_table_4 = require("../db/truCost/tc-4/add_table");
const add_table_5 = require("../db/truCost/tc-5/add_table");
const add_table_6 = require("../db/truCost/tc-6/add_table");
const add_table_7 = require("../db/truCost/tc-7/add_table");
const exit_1 = require("../db/utils/exit");
const TrucostTableImport = async (tableNumber) => {
    const database = dataMeta.dataStructures.database;
    const tableString = `${database}_tc_${tableNumber}`;
    if (database) {
        await drop_table_1.drop_table(database, tableString);
        switch (tableNumber) {
            case 1:
                add_table_1.createTcOne(database, false);
                break;
            case 2:
                add_table_2.createTcTwo(database, false);
                break;
            case 3:
                add_table_3.createTcThree(database, false);
                break;
            case 4:
                add_table_4.createTcFour(database, false);
                break;
            case 5:
                add_table_5.createTcFive(database, false);
                break;
            case 6:
                add_table_6.createTcSix(database, false);
                break;
            case 7:
                add_table_7.createTcSeven(database, false);
                break;
            default:
                process.exit(0);
        }
    }
    else {
        console.log(color.wrap("\nNO EXISTING DATABASE", color.colors.RED));
        exit_1.exitProcess();
    }
};
exports.TrucostTableImport = TrucostTableImport;
