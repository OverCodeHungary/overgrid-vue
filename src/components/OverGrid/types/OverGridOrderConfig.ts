export interface OverGridOrderConfig {
  /**
   * If true, the ordering is active. If false, the ordering is disabled.
   */
  active: boolean

  /**
   * Sets the initial order direction when a field is added to the ordering. If not set, the default order direction is 'DESC'.
   * * Possible values are 'ASC' for ascending order and 'DESC' for descending order.
   */
  initialOrderDirection?: string

  /**
   * Sets the default key for ordering in grid. Works only if the defaultOrderDirection is set. If not set, default ordering is disabled.
   */
  defaultOrder?: {
    /**
     * The key of the field to order by. This should match one of the field keys defined in the grid.
     */
    key: string

    /**
     * The key used for ordering. This can be different from the field key if the server expects a different key for ordering. Most of the time it is the same as the field key.
     */
    orderKey: string

    /**
     * Sets the default direction for ordering in grid. Works only if the defaultOrderKey is set. If not set, default ordering is disabled.
     * Possible values are 'ASC' for ascending order and 'DESC' for descending order.
     */
    direction: string // 'ASC' | 'DESC'
  }

  /**
   * If true, the user can define multiple fields for ordering. If false, the user can define only one field for ordering.
   */
  orderMultiple?: boolean

  /**
   * If true, the grid will show the order index in column title. Works only if the orderMultiple is set to true. For example if the user orders by 'name' and 'age', the grid will show '1' on name column title, and '2' in age column title.
   */
  showOrderIndex?: boolean
}
