import type { Ref, ComputedRef } from 'vue'

export interface OverGridUseAboutModalInterface {
  showModal: () => void
  closeModal: () => void
  isModalShown: Ref<boolean>
  isToolbarOptionEnabled: ComputedRef<boolean>
}
