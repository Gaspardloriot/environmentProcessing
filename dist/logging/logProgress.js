"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logProgress = void 0;
const color = require("bash-color");
const logUpdate = require("log-update");
const constants_1 = require("./constants");
const logProgress = (chunkNumber, max) => {
    const loadStatus = Math.floor((chunkNumber / max) * 40);
    const loadPercentage = Math.floor((chunkNumber / max) * 100);
    let frame = constants_1.framer[(chunkNumber = ++chunkNumber % constants_1.framer.length)];
    let message = "Uploading Chunks";
    let logColor = "YELLOW";
    if (loadPercentage === 100) {
        message = "DONE";
        logColor = "GREEN";
        frame = constants_1.framer[5];
    }
    let updateFrame = `             ${frame} ${message} ${frame}\n\n${constants_1.progressBar[loadStatus]} ${loadPercentage}%`;
    logUpdate(color.wrap(updateFrame, color.colors[logColor]));
};
exports.logProgress = logProgress;
