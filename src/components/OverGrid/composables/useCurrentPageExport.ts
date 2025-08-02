import type { OverGridCurrentPageExportConfig } from '../types/OverGridCurrentPageExportConfig'
import type { OverGridUseCurrentPageExportInterface } from '../types/OverGridUseCurrentPageExportInterface'
import { ref, computed } from 'vue'

export default (currentPageExportConfig?: OverGridCurrentPageExportConfig): OverGridUseCurrentPageExportInterface => {
  const isModalShown = ref(false)

  function showModal() {
    isModalShown.value = true
  }

  function closeModal() {
    isModalShown.value = false
  }

  const isToolbarOptionEnabled = computed<boolean>(() => {
    return !!(
      currentPageExportConfig?.active &&
      (currentPageExportConfig?.xlsxEnabled || currentPageExportConfig?.csvEnabled)
    )
  })

  return {
    showModal,
    closeModal,
    isModalShown,
    isToolbarOptionEnabled,
  }
}
