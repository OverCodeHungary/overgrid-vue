import type { Ref } from 'vue'

export interface OverGridUseAboutModalInterface {
  showModal: () => void
  closeModal: () => void
  isModalShown: Ref<boolean>
}
