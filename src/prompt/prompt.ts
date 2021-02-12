const prompter = require("prompt");
import { clientDataToSQL } from "../parse";
import { propertiesType } from "./types";

const properties: propertiesType[] = [
  {
    name: "filename",
    validator: /^[a-zA-Z\s\-]+$/,
    warning: "Username must be only letters, spaces, or dashes",
  },
];

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

export { getFilename };
