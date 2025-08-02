import type { OverGridPaginationState } from './OverGridPaginationState'
import type { ComputedRef } from 'vue'

export interface OverGridUsePaginationInterface {
  state: OverGridPaginationState
  nextPage: () => void
  previousPage: () => void
  setPage: (newPage: number) => void
  setByResponse: (responseData: any) => void
  hasPreviousPage: () => boolean
  hasNextPage: () => boolean
  lastPage: () => void
  firstPage: () => void
  currentPageForUI?: ComputedRef<number>
  changePageSize: (newPageSize: number) => void
  pageSize: ComputedRef<number>
  isToolbarOptionEnabled: ComputedRef<boolean>
}
