export interface OverGridRowHighlighterConfig {
  /**
   * Row highlighter: You can highlight any row in the grid (e.g. you can set a slightly darker background color). For example you can set background color based on a priority value in record.
   * If true, the row highlighter is active. If false, the row highlighter is disabled.
   */
  active: boolean

  /**
   * Define the highlighter function. This function should return a boolean value. If the function returns true, the row will be highlighted.
   * @param record The current record with all fields.
   */
  fn: (record: any) => boolean

  /**
   * The class that will be added to the row if the highlighter function returns true.
   */
  classList?: string
}
