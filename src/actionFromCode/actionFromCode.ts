import { getFilename, selectTableImport } from "../prompt/prompt";

const actionFromCode = (code: number) => {
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
    default:
      process.exit(0);
  }
};

export { actionFromCode };
