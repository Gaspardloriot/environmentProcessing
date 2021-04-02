import { csvParser } from "../../../parse";
import { insertDataTcOne } from "./insert_data";

/**
 * @description parses csv data into an array
 * @param fileName name of client data used to ref and id the trucost table name
 * @returns void
 */
const parsedTcOne = async (
  fileName: string,
  continueCycle: boolean
): Promise<void> => {
  const fullFileName: string = `${fileName}_tc_2`;
  const formattedData: string[] = await csvParser(fullFileName);
  insertDataTcOne(fileName, formattedData, continueCycle);
};

export { parsedTcOne };
