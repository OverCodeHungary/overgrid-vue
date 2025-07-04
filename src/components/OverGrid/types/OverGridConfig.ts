import type { OverGridField } from './OverGridField'
import type { OverGridPaginationConfig } from './OverGridPaginationConfig'
import type { OverGridOrderConfig } from './OverGridOrderConfig'
import type { OverGridRefreshableConfig } from './OverGridRefreshableConfig'
import type { OverGridColumnSelectorConfig } from './OverGridColumnSelectorConfig'
import type { OverGridCurrentPageExportConfig } from './OverGridCurrentPageExportConfig'
import type { OverGridBulkOperationsConfig } from './OverGridBulkOperationsConfig'

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
   * The filtering configuration object for the grid.
   */
  filtering?: {
    /**
     * If true, the filtering is active. If false, the filtering is disabled.
     */
    active: boolean

    /**
     * If true, the filtering is 'simple' mode. If false, the filtering is 'advanced' mode.
     * In 'simple' mode, the grid will show an input field where the user can type the filter text. The server gets only this text as a filtering value.
     * In 'advanced' mode, the grid will show a filter panel where the user can set multiple filters. The server gets all filters as an object and gets an operator between filters. The operator can be 'and' or 'or', and it is set in the filter panel.
     */
    simple?: boolean

    /**
     * If true, the filtering set to local mode. If false, the filtering is server-side.
     * Please be aware that the local filtering is working only on the current page.
     */
    local?: boolean

    /**
     * If the filtering is 'simple' mode, you can set a help text for the filtering. This text will be shown after the input field.
     */
    simpleHelpText?: string

    /**
     * If the filtering is 'simple' mode, you can set the filter template string. Use the {data} placeholder to insert the filter text.
     * For example: 'name like "{data}", description like {data}'.
     * This is useful when you have a filtering framework on server side, such as gridify (https://alirezanet.github.io/Gridify/guide/filtering.html#conditional-operators).
     * If not set, the grid will send the filter text as is.
     * FYI: You can modify the filtering parameters in the serverTransformation function as well.
     */
    simpleFilterTemplate?: string

    /**
     * If the filtering is 'simple' mode, you can set the placeholder text for the input field.
     */
    simplePlaceholder?: string
  }
  /*
   * The extra row configuration object for the grid.
   */
  extraRow?: {
    /**
     * If true, the extra row is active. If false, the extra row is disabled.
     */
    active: boolean
    /**
     * Determines the user can open more than one extra row at the same time. If false, the user can open only one extra row at a time (close the other when open a new one).
     */
    multiOpen: boolean
    /**
     * Ths extraRow slot gets the full record object of the "parent". You can define extra fields here that you want to pass to the slot.
     */
    extraParams: object
  }
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
