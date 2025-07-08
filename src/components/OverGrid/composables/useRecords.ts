import { ref, nextTick, watch } from 'vue'
import type { OverGridConfig } from '../types/OverGridConfig'
import usePagination from './usePagination'
import useOrdering from './useOrdering'
import useLogger from './useLogger'
import axios from 'axios'
import useAutoRefresh from './useAutoRefresh'
import useColumnFilters from './useColumnFilters'
import useSearch from './useSearch'
import DefaultServerTransformation from '../serverTransformations/DefaultServerTransformation'

export default (gridConfig: OverGridConfig) => {
  const records = ref<any[]>([])
  const pagination = usePagination(gridConfig.pagination, gridConfig.gridUniqueId)
  const ordering = useOrdering(gridConfig.orderConfiguration)
  const columnFilters = useColumnFilters(gridConfig.columnFilters)
  const search = useSearch(gridConfig.search)
  const logger = useLogger()
  const loading = ref(false)

  const fetchRecords = async () => {
    loading.value = true
    let response = await axios.get(gridConfig.endpoint, {
      params: gridConfig.serverTransformation
        ? gridConfig.serverTransformation(
            ordering.rawState.value,
            pagination.state,
            columnFilters.filters.value,
            search.query.value,
          )
        : DefaultServerTransformation(
            ordering.rawState.value,
            pagination.state,
            columnFilters.filters.value,
            search.query.value,
          ),
      responseType: 'json',
    })

    pagination.setByResponse(response.data)

    // @TODO: Event handling: registeredEvents.onDataLoad

    let cRecords =
      gridConfig.rootkey && response.data[gridConfig.rootkey] ? response.data[gridConfig.rootkey] : response.data

    if (!Array.isArray(cRecords)) {
      logger.error(
        'The response data is not an array. Please check your server response format and the "rootkey" configuration.',
      )
      cRecords = []
    }

    if (gridConfig.events && gridConfig.events.onDataLoad) {
      let eventResult = gridConfig.events.onDataLoad(cRecords)
      if (typeof eventResult == 'object') {
        cRecords = eventResult
      }
    }

    if (gridConfig.events && gridConfig.events.onDataLoadWithFullResponse) {
      gridConfig.events.onDataLoadWithFullResponse(response)
    }

    records.value = cRecords || []

    nextTick(function () {
      if (gridConfig.events && gridConfig.events.readyAfterRefresh) {
        gridConfig.events?.readyAfterRefresh()
      }
    })

    loading.value = false
  }

  const autoRefresh = useAutoRefresh(gridConfig.refreshable, gridConfig.gridUniqueId, fetchRecords)

  watch(
    () => [pagination.state.page, pagination.state.pageSize],
    (newPage) => {
      logger.info('Page changed to:', newPage)
      fetchRecords()
    },
  )

  watch(
    () => ordering.rawState,
    () => {
      fetchRecords()
    },
    { deep: true }, // Deep watch to capture changes in the orders array
  )

  watch(
    () => columnFilters.filters,
    () => {
      fetchRecords()
    },
    { deep: true }, // Deep watch to capture changes in the filters array
  )

  watch(
    () => search.query.value,
    () => {
      search.debounce(fetchRecords) // Use debounce to avoid too many requests
    },
    { deep: true }, // Deep watch to capture changes in the filters array
  )

  return {
    records,
    fetchRecords,
    pagination,
    ordering,
    loading,
    autoRefresh,
    columnFilters,
    search,
  }
}
