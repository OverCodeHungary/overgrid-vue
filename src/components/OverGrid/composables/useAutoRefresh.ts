import { ref, computed } from 'vue'
import type { OverGridRefreshableConfig } from '../types/OverGridRefreshableConfig'
import type { OverGridUseAutoRefreshInterface } from '../types/OverGridUseAutoRefreshInterface'

export default (
  refreshableConfig?: OverGridRefreshableConfig,
  gridUniqueId?: string,
  fetchRecords?: () => void,
): OverGridUseAutoRefreshInterface => {
  const autoRefresh = ref<string>('disabled')
  const autoRefreshInterval = ref<any>(null)

  function changeAutoRefreshValue(value: string) {
    autoRefresh.value = value
    localStorage.setItem('overgrid-auto-refresh-' + gridUniqueId, value)
    setAutoRefreshIntervalIfAny()
  }

  function setAutoRefreshIntervalIfAny() {
    if (autoRefreshInterval.value) {
      // clearing the current interval, if any
      clearInterval(autoRefreshInterval.value)
      autoRefreshInterval.value = null
    }

    if (!autoRefresh.value || autoRefresh.value == 'disabled') {
      // if autoRefresh is not exists or its disabled, we should not start any interval task
      return
    }

    // finding the new refresh type, because we need the interval value
    let newRefreshType = null
    if (refreshableConfig && refreshableConfig.autoValues && refreshableConfig.autoValues.length > 0) {
      newRefreshType = refreshableConfig.autoValues.find((item) => item.key == autoRefresh.value)
    }

    if (newRefreshType) {
      autoRefreshInterval.value = setInterval(() => {
        fetchRecords && fetchRecords()
      }, newRefreshType.refreshInterval)
    }
  }

  if (refreshableConfig?.autoActive && localStorage.getItem('overgrid-auto-refresh-' + gridUniqueId)) {
    autoRefresh.value = localStorage.getItem('overgrid-auto-refresh-' + gridUniqueId) || 'disabled'
  }

  setAutoRefreshIntervalIfAny()

  const isToolbarOptionEnabled = computed<boolean>(() => {
    return !!(refreshableConfig && refreshableConfig.autoActive)
  })

  return {
    autoRefresh,
    changeAutoRefreshValue,
    isToolbarOptionEnabled,
  }
}
