const jsonfile = require("jsonfile");
const dataStructuresMeta = require("../../../dataStructures.json");
const file = "./dataStructures.json";

const refDatabase = (filename: string) => {
  const database = `${filename}db`;
  const tableName = `${filename}_clientTable`;
  let changedFile = dataStructuresMeta;
  changedFile.dataStructures.database = database;
  changedFile.dataStructures.clientData.table = tableName;
  changedFile.dataStructures.clientData.uploaded = true;
  jsonfile.writeFile(file, changedFile, (err: string) => {
    if (err) console.error(err);
  });
};

export { refDatabase };
