"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilename = void 0;
const parse_1 = require("./parse");
const prompter = require("prompt");
const properties = [
    {
        name: "filename",
        validator: /^[a-zA-Z\s\-]+$/,
        warning: "Username must be only letters, spaces, or dashes",
    },
];
const getFilename = () => {
    console.info("please enter filename");
    prompter.start();
    prompter.get(properties, function (err, result) {
        if (err) {
            return onErr(err);
        }
        prompter.stop();
        parse_1.clientDataToSQL(result.filename);
    });
};
exports.getFilename = getFilename;
function onErr(err) {
    console.log(err);
}
