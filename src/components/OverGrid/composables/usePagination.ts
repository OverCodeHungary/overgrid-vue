import { reactive } from 'vue'
import type { OverGridPaginationConfig } from '../types/OverGridPaginationConfig'

export default (paginationConfig?: OverGridPaginationConfig) => {
  console.log(paginationConfig)
  const state = reactive({
    page:
      paginationConfig?.initialPage || paginationConfig?.initialPage === 0
        ? paginationConfig?.initialPage
        : 1,
    pageSize: paginationConfig?.initialSize || 10,
    totalPages: 0,
  })

  function nextPage() {
    if (state.totalPages > 0 && state.page < state.totalPages) {
      state.page += 1
    }
  }

  function previousPage() {
    if (state.page > 1) {
      state.page -= 1
    }
  }

  function setPage(newPage: number) {
    if (newPage > 0 && newPage <= state.totalPages) {
      state.page = newPage
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

  return {
    state,
    nextPage,
    previousPage,
    setPage,
    setByResponse,
  }
}
