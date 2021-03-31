const prompter = require("prompt");
const color = require("bash-color");
import { clientDataToSQL } from "../parse";
import { propertiesType } from "./types";
import { selectConfig } from "./constants";
import { actionFromCode } from "../actionFromCode/actionFromCode";

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
 * @description gets client Filename to launch Db import process
 * @returns void
 */
const getFilename = (): void => {
  console.log("please enter filename");
  prompter.start();

  prompter.get(properties, function (err: string, result: any) {
    if (err) {
      return onErr(err);
    }
    prompter.stop();
    clientDataToSQL(result.filename);
  });
};

function onErr(err: string) {
  console.log(err);
}

export { getFilename, selectAction };
