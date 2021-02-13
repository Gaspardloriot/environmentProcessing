import { csvParser } from "../../../parse";
import { insertDataTcOne } from "./insert_data";

/**
 * @description parses csv data into an array
 * @param fileName name of client data used to ref and id the trucost table name
 * @returns void
 */
const parsedTcOne = async (fileName: string): Promise<void> => {
  const fullFileName: string = `${fileName}_tc_1`;
  const formattedData: string[] = await csvParser(fullFileName);
  insertDataTcOne(fileName, [formattedData[2]]);
  console.log("DONE BRO");
  console.log(formattedData[2][20]);
  console.log(typeof formattedData[2][20]);
};

export { parsedTcOne };
