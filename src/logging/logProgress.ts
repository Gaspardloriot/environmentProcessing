const color = require("bash-color");
const logUpdate = require("log-update");
import { progressBar, framer } from "./constants";

const logProgress = (chunkNumber: number, max: number) => {
  const loadStatus: number = Math.floor((chunkNumber / max) * 40);
  const loadPercentage: number = Math.floor((chunkNumber / max) * 100);
  let frame: string = framer[(chunkNumber = ++chunkNumber % framer.length)];
  let message: string = "Uploading Chunks";
  let logColor: string = "YELLOW";

  if (loadPercentage === 100) {
    message = "DONE";
    logColor = "GREEN";
    frame = framer[5];
  }
  let updateFrame: string = `             ${frame} ${message} ${frame}\n\n${progressBar[loadStatus]} ${loadPercentage}%`;

  logUpdate(color.wrap(updateFrame, color.colors[logColor]));
};

export { logProgress };
