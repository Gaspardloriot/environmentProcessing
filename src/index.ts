const color = require("bash-color");
import { getFilename } from "./prompt/prompt";
import { createTcOne } from "./db/truCost/tc-1/add_table";
import { createProject_data } from "./db/mapping/carbon/carbonTc1";

getFilename();

const checkDbStatus = setInterval(() => {
  checkDataStructures();
}, 100);

/**
 * @description checks whether client data has been uploaded
 * @returns void
 */
const checkDataStructures = () => {
  const dataMeta = require("../dataStructures.json");

  if (dataMeta.dataStructures.clientData.uploaded) {
    createTcOne(dataMeta.dataStructures.database);
    console.log(
      "CLIENT DATA MIGRATION...",
      color.wrap("DONE", color.colors.GREEN)
    );
    stopCheck(checkDbStatus);
  }
};

const checkAllDataUploaded = () => {
  const dataMeta = require("../dataStructures.json");
  const tcTables: any = dataMeta.dataStructures.trucostData;
  if (
    tcTables.table1.uploaded &&
    tcTables.table2.uploaded &&
    tcTables.table3.uploaded &&
    tcTables.table4.uploaded &&
    tcTables.table5.uploaded &&
    tcTables.table6.uploaded &&
    tcTables.table7.uploaded
  ) {
    createProject_data();
    console.log("all tables uploaded, moving on to project_data step");
  } else {
    console.log("not all tables were uploaded successfully");
  }
};

const stopCheck = (toStop: any) => {
  clearInterval(toStop);
};

var list = require("select-shell")(
  /* possible configs */
  {
    pointer: " ▸ ",
    pointerColor: "yellow",
    checked: " ◉  ",
    unchecked: " ◎  ",
    checkedColor: "blue",
    msgCancel: "No selected options!",
    msgCancelColor: "orange",
    multiSelect: true,
    inverse: true,
    prepend: true,
    disableInput: true,
  }
);

var stream = process.stdin;

list.option(" One    ").option(" Two    ").option(" Three  ").list();

list.on("select", function (options: any) {
  console.log(options);
  process.exit(0);
});

list.on("cancel", function (options: any) {
  console.log("Cancel list, " + options.length + " options selected");
  process.exit(0);
});

export { checkAllDataUploaded };
