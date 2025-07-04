export interface OverGridBulkOperationsConfig {
  /**
   * If true, the column selector/bulk operation is active. If false, the column selector/bulk operation is disabled.
   */
  active: boolean
  /**
   * The bulk operation methods. You can define multiple methods here. Each method has a title, a key (must be unique) and an action function. The action function gets the checked rows and a function to clear the checked rows.
   */
  methods: Array<{
    title: string
    key: string
    action: (checkedRows: any[], clearRows: () => void) => void
  }>
}
