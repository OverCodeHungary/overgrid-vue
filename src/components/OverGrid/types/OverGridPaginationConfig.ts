export interface OverGridPaginationConfig {
  /**
   * If true, the pagination is active. If false, the pagination is disabled.
   */
  active: boolean
  /**
   * The initial page number.
   */
  initialPage: number

  /**
   * The initial page size.
   */
  initialSize: number

  /**
   * The possible page sizes that the user can select/change in settins menu. If not set, the grid will not show the page size selector.
   */
  possiblePageSizes?: Array<number>

  /**
   * Define the field that you use in the server's response to store the total number of records. This field is used for pagination. For example, if your server returns an object like this: { data: [{...}, {...}], count: 2 }, then the allRecordsCountKey is 'count'.
   */
  allRecordsCountKey: string
}
