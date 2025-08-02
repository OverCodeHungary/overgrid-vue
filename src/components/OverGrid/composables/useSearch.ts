import { ref, computed } from 'vue'
import type { OverGridUseSearchInterface } from '../types/OverGridUseSearchInterface'
import type { OverGridSearchConfig } from '../types/OverGridSearchConfig'

export default (searchConfig?: OverGridSearchConfig): OverGridUseSearchInterface => {
  const query = ref<string>(searchConfig?.initialQuery || '')
  const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null)

  function debounce(func: Function): void {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }

    timeoutId.value = setTimeout(() => {
      func(query.value)
      timeoutId.value = null
    }, searchConfig?.debounceTime || 300)
  }

  const isToolbarOptionEnabled = computed<boolean>(() => {
    return !!searchConfig?.active
  })

  return {
    query,
    debounce,
    isToolbarOptionEnabled,
  }
}
