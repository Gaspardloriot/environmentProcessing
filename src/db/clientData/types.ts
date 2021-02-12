interface postType {
  title: string;
  body: string;
}

interface dbResponse {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}

export { postType, dbResponse };
