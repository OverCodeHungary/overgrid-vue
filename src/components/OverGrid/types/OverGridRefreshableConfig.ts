export interface OverGridRefreshableConfig {
  /**
   * If true, the refresh button is active. If false, the refresh button is hidden.
   */
  manualActive: boolean

  /**
   * If true, the auto refresh is active in the grid's menu. If false, the auto refresh is disabled.
   */
  autoActive: boolean

  /**
   * If true, the auto refresh can be disabled in the grid's menu by the user. If false, the auto refresh cannot be disabled.
   */
  autoCanBeDisabled: boolean

  /**
   * The auto refresh values. You can set multiple values here. Each value has a key (must be unique), a refresh interval in seconds and a title. The default value is the value that is selected by default in the grid's menu.
   */
  autoValues: Array<{
    /**
     * The key of the value. This key is used in the grid's menu to identify the value. It must be unique in the array.
     */
    key: string

    /**
     * The refresh interval in seconds.
     */
    refreshInterval: number

    /**
     * The title of the value. This title is shown in the grid's menu.
     */
    title: string

    /**
     * If true, the value is the default value. If false, the value is not the default value.
     */
    default?: boolean
  }>
}
