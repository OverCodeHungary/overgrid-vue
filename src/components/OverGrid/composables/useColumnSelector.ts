import type { OverGridColumnSelectorConfig } from '../types/OverGridColumnSelectorConfig'
import type { OverGridUseColumnSelectorInterface } from '../types/OverGridUseColumnSelectorInterface'
import { OverGridField } from '../types/OverGridField'
import { ref, computed } from 'vue'

export default (
  columnSelectorConfig?: OverGridColumnSelectorConfig,
  gridUniqueId?: string,
): OverGridUseColumnSelectorInterface => {
  const isModalShown = ref(false)
  const selectedFields = ref<string[] | null>(null)

  function showModal() {
    isModalShown.value = true
  }

  function closeModal() {
    isModalShown.value = false
  }

  function setColumns(selectedColumns: string[]) {
    selectedFields.value = selectedColumns
    localStorage.setItem('overgrid-column-selector-' + gridUniqueId, JSON.stringify(selectedFields.value))
  }

  function filter(fields: OverGridField[]): OverGridField[] {
    if (selectedFields.value === null) {
      return fields
    }

    return fields.filter((field) => selectedFields.value?.includes(field.key))
  }

  if (localStorage.getItem('overgrid-column-selector-' + gridUniqueId)) {
    const storedColumns = JSON.parse(localStorage.getItem('overgrid-column-selector-' + gridUniqueId) || '[]')
    selectedFields.value = storedColumns.length > 0 ? storedColumns : null
  }

  const isToolbarOptionEnabled = computed<boolean>(() => {
    return !!(columnSelectorConfig && columnSelectorConfig.active)
  })

  return {
    showModal,
    closeModal,
    isModalShown,
    selectedFields,
    setColumns,
    filter,
    isToolbarOptionEnabled,
  }
}
