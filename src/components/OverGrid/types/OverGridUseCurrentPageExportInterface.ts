import type { Ref } from 'vue'

export interface OverGridUseCurrentPageExportInterface {
  showModal: () => void
  closeModal: () => void
  isModalShown: Ref<boolean>
}
