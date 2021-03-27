import { csvParser } from "../../parse";

const ObjectsToCsv = require("objects-to-csv");

const getProjectTableInCsv = async (projectTableJson: Object) => {
  const projectTableCsv = new ObjectsToCsv(projectTableJson);

  await projectTableCsv.toDisk("./project_table.csv");
};

export { getProjectTableInCsv };
