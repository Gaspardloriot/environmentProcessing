const { Parser } = require("json2csv");

const getProjectTableInCsv = (projectTableJson: Object) => {
  const json2csvParser = new Parser();
  const projectTableCsv = json2csvParser.parse(projectTableJson);
};
