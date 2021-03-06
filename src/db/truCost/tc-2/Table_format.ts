const tc2Format =
  "(identifier bigint, TCUID int, Company VARCHAR(255), ISIN VARCHAR(55), Financial_Year int, GICS_Sector_Name VARCHAR(55), GICS_Industry_Group_Name VARCHAR(55), GICS_Industry_Name VARCHAR(55), GICS_Sub_Industry_Name VARCHAR(255), Country VARCHAR(55), Carbon_Scope_3_Upstream_tCO2e float, Carbon_Scope_3_Downstream_tCO2e float, Carbon_Intensity_Scope_3_Upstream_tCO2e_PER_USD_mn float, Carbon_Intensity_Scope_3_Downstream_tCO2e_PER_USD_mn float, Carbon_Disclosure VARCHAR(255), Revenue_USD_mn float, PRIMARY KEY(identifier))";

export { tc2Format };
