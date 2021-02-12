const jsonfile = require("jsonfile");
const dataStructuresMeta: metadataType = require("../../../dataStructures.json");
import { metadataType } from "../types";

const filePath: string = "./dataStructures.json";
/**
 *@description if client data upload is successful, will update data meta
 * @param filename string name of client data file
 * @returns void
 */
const refDatabase = (filename: string): void => {
  const database: string = `${filename}db`;
  const tableName: string = `${filename}_clientTable`;
  let changedFile: metadataType = dataStructuresMeta;
  changedFile.dataStructures.database = database;
  changedFile.dataStructures.clientData.table = tableName;
  changedFile.dataStructures.clientData.uploaded = true;
  jsonfile.writeFile(filePath, changedFile, (err: string) => {
    if (err) console.error(err);
  });
};

export { refDatabase };
