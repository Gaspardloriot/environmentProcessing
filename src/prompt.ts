import { clientDataToSQL } from "./parse";
const prompter = require("prompt");

const properties = [
  {
    name: "filename",
    validator: /^[a-zA-Z\s\-]+$/,
    warning: "Username must be only letters, spaces, or dashes",
  },
];

const getFilename = (): void => {
  console.info("please enter filename");
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
