import { reactive, computed } from 'vue'
import type { OverGridPaginationConfig } from '../types/OverGridPaginationConfig'
import type { OverGridUsePaginationInterface } from '../types/OverGridUsePaginationInterface'

export default (
  paginationConfig?: OverGridPaginationConfig,
  gridUniqueId?: string,
): OverGridUsePaginationInterface => {
  const state = reactive({
    page:
      paginationConfig?.initialPage ||
      (paginationConfig?.startWithZero && paginationConfig?.initialPage === 0)
        ? paginationConfig?.initialPage
        : paginationConfig?.startWithZero
          ? 0
          : 1,
    pageSize: paginationConfig?.initialSize || 10,
    totalPages: 0,
  })

  function nextPage() {
    if (
      state.totalPages > 0 &&
      state.page < state.totalPages - (paginationConfig?.startWithZero ? 1 : 0)
    ) {
      state.page += 1
    }
  }

  function previousPage() {
    if (state.page > 1 - (paginationConfig?.startWithZero ? 1 : 0)) {
      state.page -= 1
    }
  }

  function setPage(newPage: number) {
    if (
      newPage > 0 + (paginationConfig?.startWithZero ? 0 : 1) &&
      newPage < state.totalPages - (paginationConfig?.startWithZero ? 1 : 0)
    ) {
      state.page = newPage
    }
  }

  function lastPage() {
    if (state.totalPages > 0) {
      state.page = state.totalPages - (paginationConfig?.startWithZero ? 1 : 0)
    }
  }

  function firstPage() {
    if (state.totalPages > 0) {
      state.page = paginationConfig?.startWithZero ? 0 : 1
    }
  }

  function changePageSize(newPageSize: number) {
    if (paginationConfig?.possiblePageSizes?.includes(newPageSize)) {
      state.pageSize = newPageSize
      // Reset to the first page when changing page size
      state.page = paginationConfig?.startWithZero ? 0 : 1
      localStorage.setItem('overgrid-page-size-' + gridUniqueId, newPageSize.toString())
    }
  }

  function setByResponse(responseData: any) {
    if (paginationConfig && paginationConfig.allRecordsCountKey) {
      if (paginationConfig.allRecordsCountKey.includes('.')) {
        // Handle nested keys
        const keys = paginationConfig.allRecordsCountKey.split('.')
        let value = responseData
        for (const key of keys) {
          if (value && key in value) {
            value = value[key]
          } else {
            value = 0
            break
          }
        }

        if (value) {
          state.totalPages = Math.ceil(value / state.pageSize)
        }
      } else {
        let allRecordsCount = responseData[paginationConfig.allRecordsCountKey]
          ? responseData[paginationConfig.allRecordsCountKey]
          : 0
        state.totalPages = Math.ceil(allRecordsCount / state.pageSize)
      }
    } else {
      state.totalPages = 0
    }
  }

  function hasPreviousPage() {
    return state.page > 1 - (paginationConfig?.startWithZero ? 1 : 0)
  }

  function hasNextPage() {
    return state.page < state.totalPages - (paginationConfig?.startWithZero ? 1 : 0)
  }

  const currentPageForUI = computed(() => {
    return paginationConfig?.startWithZero ? state.page + 1 : state.page
  })

  return {
    state,
    nextPage,
    previousPage,
    setPage,
    setByResponse,
    hasPreviousPage,
    hasNextPage,
    firstPage,
    lastPage,
    currentPageForUI,
    changePageSize,
    pageSize: computed(() => state.pageSize),
  }
}
