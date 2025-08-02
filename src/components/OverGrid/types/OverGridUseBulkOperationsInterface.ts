import type { Ref, ComputedRef } from 'vue'

export interface OverGridUseBulkOperationsInterface {
  checkedRows: Ref<string[]>
  isToolbarOptionEnabled: ComputedRef<boolean>
}
