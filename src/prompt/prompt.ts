const prompter = require("prompt");
const color = require("bash-color");
import { clientDataToSQL } from "../parse";
import { propertiesType } from "./types";
import { selectConfig } from "./constants";
import { actionFromCode } from "../actionFromCode/actionFromCode";
import { TrucostTableImport } from "../actionFromCode/TrucostTableImport";

const properties: propertiesType[] = [
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
  console.log(
    color.wrap("\n\nPlease select an action to perform :\n", color.colors.CYAN)
  );

  const list = require("select-shell")(selectConfig);
  process.stdin;

  list
    .option("Trucost + Client Import", 1)
    .option("Client Import", 2)
    .option("Trucost Table Import", 3)
    .list();

  list.on("select", (option: any) => {
    actionFromCode(option[0].value);
  });

  list.on("cancel", (options: any) => {
    console.log("Cancel list, " + options.length + " options selected");
    process.exit(0);
  });
};

/**
 * @description select one of 7 tables to import
 */
const selectTableImport = () => {
  console.log(
    color.wrap("\n\nPlease select Table to import :\n", color.colors.CYAN)
  );

  const list = require("select-shell")(selectConfig);
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

  list.on("select", (option: any) => {
    TrucostTableImport(option[0].value);
  });

  list.on("cancel", (options: any) => {
    console.log("Cancel list, " + options.length + " options selected");
    process.exit(0);
  });
};

/**
 * @description gets client Filename to launch Db import process
 * @returns void
 */
const getFilename = (continueCycle: boolean): void => {
  console.log("please enter filename");
  prompter.start();

  prompter.get(properties, (err: string, result: any) => {
    if (err) {
      return onErr(err);
    }
    prompter.stop();
    clientDataToSQL(result.filename, continueCycle);
  });
};

const onErr = (err: string): void => {
  console.log(err);
};

export { getFilename, selectAction, selectTableImport };
