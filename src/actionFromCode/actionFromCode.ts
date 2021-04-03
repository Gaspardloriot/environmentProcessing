const dataMeta = require("../../dataStructures.json");
import { getFilename, selectTableImport } from "../prompt/prompt";
import { cleanSlate } from "../db/utils/cleanSlate";

const actionFromCode = async (code: number) => {
  switch (code) {
    case 1:
      getFilename(true);
      break;
    case 2:
      getFilename(false);
      break;
    case 3:
      selectTableImport();
      break;
    case 4:
      await cleanSlate(dataMeta.dataStructures.database);
    default:
      process.exit(0);
  }
};

export { actionFromCode };
