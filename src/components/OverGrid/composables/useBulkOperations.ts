import type { OverGridBulkOperationsConfig } from '../types/OverGridBulkOperationsConfig'
import type { OverGridUseBulkOperationsInterface } from '../types/OverGridUseBulkOperationsInterface'
import useLogger from './useLogger'
import { ref, watch, computed } from 'vue'

export default (
  bulkOperationsConfig?: OverGridBulkOperationsConfig,
  idkey?: string,
  onBulkSelectChanges?: (checkedRows: Array<any>) => void,
): OverGridUseBulkOperationsInterface => {
  const checkedRows = ref<string[]>([])
  const logger = useLogger()

  if (bulkOperationsConfig && bulkOperationsConfig.active && !idkey) {
    logger.warn(
      'Bulk operations are active, but no idkey is provided. Please provide an idkey to enable bulk operations.',
    )
  }

  watch(
    () => checkedRows.value,
    () => {
      if (onBulkSelectChanges && typeof onBulkSelectChanges === 'function') {
        onBulkSelectChanges(checkedRows.value)
      }
    },
    { deep: true },
  )

  const isToolbarOptionEnabled = computed<boolean>(() => {
    return !!(bulkOperationsConfig && bulkOperationsConfig.active && bulkOperationsConfig.methods?.length > 0 && idkey)
  })

  return {
    checkedRows,
    isToolbarOptionEnabled,
  }
}
