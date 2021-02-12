interface metadataType {
  dataStructures: {
    database: string;
    clientData: {
      table: string;
      uploaded: boolean;
    };
    trucostData: {
      table1: {
        table: string;
        uploaded: boolean;
      };
      table2: {
        table: string;
        uploaded: boolean;
      };
      table3: {
        table: string;
        uploaded: boolean;
      };
      table4: {
        table: string;
        uploaded: boolean;
      };
      table5: {
        table: string;
        uploaded: boolean;
      };
      table6: {
        table: string;
        uploaded: boolean;
      };
    };
  };
}

export { metadataType };
