import type { OverGridUseAboutModalInterface } from '../types/OverGridUseAboutModalInterface'
import { ref, computed } from 'vue'

export default (hideAboutWindow: boolean): OverGridUseAboutModalInterface => {
  const isModalShown = ref(false)

  function showModal() {
    isModalShown.value = true
  }

  function closeModal() {
    isModalShown.value = false
  }

  const isToolbarOptionEnabled = computed<boolean>(() => {
    return hideAboutWindow !== true
  })

  return {
    showModal,
    closeModal,
    isModalShown,
    isToolbarOptionEnabled,
  }
}
