const client_tc: string =
  "(uniqid VARCHAR(255), identifier bigint, Fund_Name VARCHAR(55), Portfolio_Or_Index VARCHAR(55), Holding_Date VARCHAR(55), Holding_Currency VARCHAR(55), Report_Currency VARCHAR(55), Denominator_ExchangeRate float, Report_ExchangeRate float, Holding_VoH_Or_Weight float, Report_VoH_Or_Weight float, Trucost_UID int, Identifier_Type VARCHAR(55), Identifier_Value VARCHAR(55), TC_Display_Name VARCHAR(255), Latest_Year int, Accounting_Date VARCHAR(55), AccountingDate_ExchangeRate float, Apportioning_Denominator_CRNCY float, Apportioning_Factor float, Weight float, Revenue_USDm float, PRIMARY KEY(uniqid))";

export { client_tc };
