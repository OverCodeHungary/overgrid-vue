import type { OverGridUseAboutModalInterface } from '../types/OverGridUseAboutModalInterface'
import { ref } from 'vue'

export default (): OverGridUseAboutModalInterface => {
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
