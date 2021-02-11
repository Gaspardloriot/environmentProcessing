import { csvParser } from "../../../parse";
import { insertDataTcOne } from "./insert_data";
const parsedTcOne = async (fileName: string): Promise<void> => {
  const fullFileName = `${fileName}_tc_3`;
  const formattedData: string[] = await csvParser(fullFileName);
  insertDataTcOne(fileName, formattedData);
};

export { parsedTcOne };
