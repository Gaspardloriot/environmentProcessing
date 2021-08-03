const color = require("bash-color");
import { selectAction } from "./prompt/prompt";
import { createProject_data } from "./db/mapping/carbon/carbonTc1";

selectAction();

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

export { checkAllDataUploaded };
