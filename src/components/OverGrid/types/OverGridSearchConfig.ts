export interface OverGridSearchConfig {
  /**
   * If true, the search is active. If false, the search is disabled.
   */
  active: boolean

  /**
   * The placeholder text for the search input.
   */
  inputPlaceholder?: string

  /**
   * The initial query to set in the search input when the grid is loaded.
   * This can be used to pre-populate the search input with a specific value.
   */
  initialQuery?: string

  /**
   * The debounce time in milliseconds for the search input.
   * Default is 300ms.
   */
  debounceTime?: number
}
