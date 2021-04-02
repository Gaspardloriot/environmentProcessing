import { getFilename, selectTableImport } from "../prompt/prompt";

const actionFromCode = (code: number) => {
  switch (code) {
    case 1:
      getFilename();
      break;
    case 2:
      console.log("case 2");
      break;
    case 3:
      selectTableImport();
      break;
    default:
      process.exit(0);
  }
};

export { actionFromCode };
