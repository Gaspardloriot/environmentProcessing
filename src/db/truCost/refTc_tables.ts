const jsonfile = require("jsonfile");
const dataStructuresMeta = require("../../../dataStructures.json");
const file: string = "./dataStructures.json";
/**
 * @description on success of trucost data migration to sql, metabase will be uploaded
 * @param filename string name of the file which serves as ref for table name for the dataset
 * @param tableNumber string name with number to search the right meta data
 * @returns void
 */
const refFile = (filename: string, tableNumber: string): void => {
  const tableName: string = filename;
  let changedFile = dataStructuresMeta;

  changedFile.dataStructures.trucostData[tableNumber].table = tableName;
  changedFile.dataStructures.trucostData[tableNumber].uploaded = true;

  jsonfile.writeFile(file, changedFile, (err: string) => {
    if (err) console.error(err);
  });
};

export { refFile };
