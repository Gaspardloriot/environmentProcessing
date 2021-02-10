const jsonfile = require("jsonfile");
const dataStructuresMeta = require("../../../../dataStructures.json");
const file = "./dataStructures.json";

const refFile = (filename: string, tableNumber: string) => {
  const tableName: string = `${filename}_clientTable`;
  let changedFile: any = dataStructuresMeta;
  changedFile.dataStructures.trucostData[tableNumber].table = tableName;
  changedFile.dataStructures.trucostData[tableNumber].uploaded = true;
  jsonfile.writeFile(file, changedFile, (err: string) => {
    if (err) console.error(err);
  });
};

export { refFile };
