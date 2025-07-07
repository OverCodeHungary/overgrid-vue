export interface OverGridColumnFilter {
  /**
   * The key of the field that this filter applies to.
   */
  key: string

  /**
   * The filter key is used when the DTO key is different from the filter key what the server expects.
   * This is useful when the server expects a different key for filtering.
   * For example, if the field key is 'id' but the server expects 'user.id' for filtering,
   * Most of the time it is the same as the field key.
   */
  filterKey: string

  /**
   * The type of the filter.
   * This can be 'text', 'number', 'date', etc.
   */
  type: string

  /**
   * The operator of the filter.
   * This can be 'cn', 'ncn', 'eq', 'neq', etc.
   */
  operation: string

  /**
   * The value of the filter.
   * This can be a string, number, date, etc. depending on the type of the filter.
   */
  value: any
}
