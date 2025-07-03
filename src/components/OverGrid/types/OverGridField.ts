export class OverGridField {
  constructor(key: string, title: string, fieldsObject: any) {
    this.key = key
    this.title = title
    this.fieldsObject = fieldsObject
  }

  fieldsObject: any

  /**
   * The field name is the key of the field in the record object. It is used to access the value of the field in the record object responded from server.
   * For example, if the field name is 'id', you can access the value of the field in the record object using record.id.
   */
  key: string

  /**
   * The title of the column shown in the thead.
   */
  title: string

  /**
   * If true, the column is visible. If false, the column is hidden in grid.
   */
  visible?: boolean

  /**
   * If set, the column is filterable. If false, the column is not filterable.
   */
  filterable?: {
    /**
     * If true, the filter is active. If false, the filter is disabled for the field.
     */
    active: boolean

    /**
     * The filter type. The filter type is used to determine the filter input field. The possible values are 'text', 'number', 'date', 'status'.
     */
    type?: string

    /**
     * Applicable only in case of 'Status' filter type. If true, the UI will block the possibility to select multiple values. If false or not provided, the UI will allow multiple selections.
     */
    disableMultiple?: boolean

    /**
     * The key to send to the server. If not set, the key is the same as the field name. If set, the key is the value of the key. Useful when the server expects a different key as it serves in the DTO.
     */
    filterKey?: string

    /**
     * If set, this title will be shown in the Search Panel. If not set, the title is the same as the field title defined in "title" key.
     */
    titleOverride?: string
  }
  /**
   * A function to modify the data after it gets from the server but before showing in the cell. This function is called before the data is shown in the cell. You can modify the data here. For example, you can format a date, or you can show a different value based on the raw data.
   * @param data The raw data of the cell
   * @param record The full record object
   * @returns The modified/formatted/tweaked data to show in the cell
   */
  middleware?: (data: any, record: any) => any

  /**
   * A function to transform the data before export to an XLSX (or CSV) cell. This function is called before the data is written to the XLSX (or CSV) file. You can modify the data here. For example, you can format a date, or you can show a different value based on the raw data.
   * If the exportMiddleware is set, the middleware function will not be called for the export. If the exportMiddleware is not set, the middleware function will be called for the export. If neither are set, the data will be exported as is.
   * @param data The raw data of the cell
   * @param record The full record object
   * @param format The format of the cell. The format is used to determine the type of the export. Currently, the possible values are 'xlsx', 'csv'.
   * @returns The modified/formatted/tweaked data to show in the cell
   */
  exportMiddleware?: (data: any, record: any, format?: string) => any

  /**
   * If true, the column is selectable in the Column Selector Panel. If false, the column is not selectable.
   * Default is true.
   */
  selectable?: boolean = true

  /**
   * If true, the column is orderable/sortable. If false, the column is not orderable/sortable.
   * Default is true.
   */
  orderable?: boolean = true

  /**
   * You can set a custom order key for the column. If not set, the order key is the same as the field name. Useful when the server expects a different key as it serves in the DTO.
   */
  orderKey?: string

  /**
   * If its true or not set, the column is exportable and will be added in the export file. If false, the column is not exportable.
   * Default is true.
   */
  exportable?: boolean = true

  /**
   * Sets the width of the column. If not set, the column width is auto. Example values: '100px', '10%'.
   */
  width?: string

  /**
   * The formatter configuration object for the column. The formatter is a special component to format the data in the cell.
   * There are 9 types of formatters built-in: 'Boolean', 'DateTime', 'Highlighter', 'HTML', 'LongText', 'Operations', 'Status', 'Strong', 'Tailwind'.
   * You can set the formatter type and the configuration object for the formatter. For example, a 'Strong' type of formatter makes the text bold in cell, and a 'DateTime' type of formatter formats the date.
   * You can define your own custom formatter as well. Check the documentation 'Custom formatters' section for more information.
   */
  formatter?: {
    /**
     * The type of the formatter.
     */
    type: string

    /**
     * The configuration object for the formatter. The configuration object is specific to the formatter type.
     * For example, a 'DateTime' formatter can have a 'format' field to define the date format, while a 'Status' formatter can have a 'statuses' field to define the possible statuses.
     */
    config?: any
  }

  commit() {}
}
