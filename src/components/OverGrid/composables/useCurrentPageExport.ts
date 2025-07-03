import type { OverGridCurrentPageExportConfig } from '../types/OverGridCurrentPageExportConfig'
import type { OverGridUseCurrentPageExportInterface } from '../types/OverGridUseCurrentPageExportInterface'
import { ref } from 'vue'

export default (currentPageExportConfig?: OverGridCurrentPageExportConfig): OverGridUseCurrentPageExportInterface => {
  const isModalShown = ref(false)

  function showModal() {
    isModalShown.value = true
  }

  function closeModal() {
    isModalShown.value = false
  }

  return {
    showModal,
    closeModal,
    isModalShown,
  }
}
