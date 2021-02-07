import { csvParser } from "./parse";
import { launchDatabase, insertData } from "./db/index";
const getData = async () => {
  const data = await csvParser();
  insertData(data);
};

getData();
launchDatabase();
