import type { OverGridField } from './OverGridField'
import type { OverGridPaginationConfig } from './OverGridPaginationConfig'
import type { OverGridOrderConfig } from './OverGridOrderConfig'
import type { OverGridRefreshableConfig } from './OverGridRefreshableConfig'
import type { OverGridColumnSelectorConfig } from './OverGridColumnSelectorConfig'
import type { OverGridCurrentPageExportConfig } from './OverGridCurrentPageExportConfig'
import type { OverGridBulkOperationsConfig } from './OverGridBulkOperationsConfig'
import type { OverGridExtraRowConfig } from './OverGridExtraRowConfig'
import type { OverGridColumnFiltersConfig } from './OverGridColumnFIltersConfig'

/**
 * The full configuration object for the OverGrid
 */
interface OverGridConfig {
  /**
   * The unique ID of the grid. This is used for the grid's internal operations. It should be unique for each grid in the same domain.
   */
  gridUniqueId: string

  /**
   * The endpoint of the API
   */
  endpoint: string

  /**
   * The field that you use as unique ID in records. This field is used internally for row selection, bulk operations and "extra row".
   * For example, if your server returns an object like this: { data: [{ id: 1, name: 'Jane' }, { id: 2, name: 'Jack' }], count: 2 }, then the idKey is 'id'.
   * Not set this field leads to unexpected behavior and bugs.
   */
  idkey?: string

  /**
   * Theme code for the OverGrid.
   */
  theme?: string

  /**
   * The root key of the server's response object. For example, if your server returns an object like this: { data: [{...}, {...}], count: 2 }, then the root key is 'data'. If null, the root key is the root object itself.
   */
  rootkey?: string

  /**
   * The possible languages that the grid can use. If not set, the grid will use the default language, which is 'en'.
   * Currently, the possible languages are 'en' and 'hu'.
   * If you set the locale to an object, you can pass a custom locale to the grid. See the 'i18n' section for more information.
   */
  locale?: string | Record<string, string>

  /**
   * If true, the grid will show the about window. Otherwise the grid will not show the about window.
   */
  hideAboutWindow?: boolean

  /**
   * The configuration object for the ordering in grid. If not set, the order is fully disabled.
   */
  orderConfiguration?: OverGridOrderConfig

  /**
   * You can modify the server request parameters before sending to the server. This function is called before the request is sent. You can modify the ordering, pagination and filtering parameters in order to your needs. If not set, the grid will send the parameters as is.
   * @param orders List of ordering objects. Each object has a key and a direction (ASC or DESC).
   * @param pagination The pagination object.
   * @param filters List of filters. Each filter has a key, an operator and a value.
   * @returns The modified URLSearchParams object.
   */
  serverTransformation?: (orders: any, pagination: any, filters: any) => URLSearchParams

  /**
   * You can modify the axios instance before sending the request to the server. This function is called before the request is sent. You can modify the axios instance in order to your needs. If not set, the grid will use the default axios instance.
   * @param axios The default axios instance.
   * @returns The modified axios instance.
   */
  axiosConfigurator?: (axios: any) => any

  /**
   * The pagination configuration object for the grid.
   */
  pagination?: OverGridPaginationConfig

  rowHighlighter?: {
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
  }

  /**
   * Setup the column filters for the grid.
   * If not set, the column filters are disabled.
   * If you want to use the column filters, you can set the active property to true
   */
  columnFilters?: OverGridColumnFiltersConfig
  /*
   * The extra row configuration object for the grid.
   */
  extraRow?: OverGridExtraRowConfig
  /*
   * The column selector/bulk operation configuration object for the grid.
   */
  bulkOperations?: OverGridBulkOperationsConfig
  /*
   * The events configuration object for the grid.
   */
  events?: {
    /**
     * The event is fired when the grid is ready. The grid is ready when the first data load is finished.
     */
    onDataLoad?: (data: Array<any>) => Array<any>
    /*
     * Same as the onDataLoad event, but this event gets the full response object, not just the data.
     */
    onDataLoadWithFullResponse?: (response: any) => Array<any>
    /**
     * The event is fired when the grid is ready after a refresh. The grid is ready when the first data load is finished.
     */
    readyAfterRefresh?: () => void
    /**
     * The event is fired when the selected records on the current pages are changed. The function gets the selected rows.
     */
    onBulkSelectChanges?: (checkedRows: Array<any>) => void
  }
  /*
   * The column selector configuration object for the grid.
   */
  columnSelector?: OverGridColumnSelectorConfig
  /*
   * The XLSX/CSV export configuration object for the grid.
   */
  currentPageExport?: OverGridCurrentPageExportConfig
  /*
   * The refreshable configuration object for the grid.
   */
  refreshable?: OverGridRefreshableConfig

  /**
   * The columns configuration object for the grid. The key of the object is the field name in the server's response. The value is the configuration object for the column. See the MappingRecordType for more information.
   */
  mapping?: OverGridField[]
}

export type { OverGridConfig }
