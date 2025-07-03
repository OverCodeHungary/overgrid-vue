export interface OverGridCurrentPageExportConfig {
  /**
   * If true, the XLSX/CSV export is active. If false, the XLSX/CSV export is disabled.
   */
  active: boolean

  /**
   * If true, the XLSX export is enabled. If false, the XLSX export is disabled.
   * One of the fields 'xlsxEnabled' or 'csvEnabled' must be true to enable the export functionality.
   */
  xlsxEnabled?: boolean

  /**
   * If true, the CSV export is enabled. If false, the CSV export is disabled.
   * One of the fields 'xlsxEnabled' or 'csvEnabled' must be true to enable the export functionality.
   */
  csvEnabled?: boolean

  additionalExportFields?: {
    /**
     * User-defined function to append additional fields for the export. The function gets the record object and should return an array.
     */
    columnsFn?: Function
  }
}
