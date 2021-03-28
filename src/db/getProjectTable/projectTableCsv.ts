const ObjectsToCsv = require("objects-to-csv");
import { sendProjectTable } from "../../mailService/sendProjectTable";
const getProjectTableInCsv = async (projectTableJson: Object) => {
  const projectTableCsv = new ObjectsToCsv(projectTableJson);

  await projectTableCsv.toDisk("./src/db/getProjectTable/project_table.csv");
  await sendProjectTable().catch(console.error);
};

export { getProjectTableInCsv };
