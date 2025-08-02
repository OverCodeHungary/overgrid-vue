import type { Ref, ComputedRef } from 'vue'

export interface OverGridUseCurrentPageExportInterface {
  showModal: () => void
  closeModal: () => void
  isModalShown: Ref<boolean>
  isToolbarOptionEnabled: ComputedRef<boolean>
}
