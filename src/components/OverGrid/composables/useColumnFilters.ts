import type { OverGridColumnFilter } from '../types/OverGridColumnFilter'
import type { OverGridColumnFiltersConfig } from '../types/OverGridColumnFIltersConfig'
import { ref } from 'vue'
import type { OverGridUseColumnFiltersInterface } from '../types/OverGridUseColumnFiltersInterface'
import type { OverGridField } from '../types/OverGridField'

export default (columnFiltersConfig?: OverGridColumnFiltersConfig): OverGridUseColumnFiltersInterface => {
  const filters = ref<OverGridColumnFilter[]>([])
  const fieldUnderAdding = ref<OverGridField | null>(null)

  function isFieldActive(field: OverGridField): boolean {
    return filters.value.some((filter) => filter.key === field.key)
  }

  function returnCurrentFilter(field: OverGridField): OverGridColumnFilter | undefined {
    return filters.value.find((filter) => filter.key === field.key)
  }

  function toggleColumnFilter(field: OverGridField): void {
    const existingFilterIndex = filters.value.findIndex((filter) => filter.key === field.key)

    if (existingFilterIndex !== -1) {
      // If the filter already exists, remove it
      filters.value.splice(existingFilterIndex, 1)
    } else {
      // If the filter does not exist, show the modal to add it
      initiateColumnFilter(field)
    }
  }

  function initiateColumnFilter(field: OverGridField | null): void {
    fieldUnderAdding.value = field
  }

  function removeColumnFilter(field: OverGridField): void {
    const existingFilterIndex = filters.value.findIndex((filter) => filter.key === field.key)

    if (existingFilterIndex !== -1) {
      // If the filter exists, remove it
      filters.value.splice(existingFilterIndex, 1)
    }
  }

  function registerColumnFilter(filter: OverGridColumnFilter): void {
    const existingFilterIndex = filters.value.findIndex((f) => f.key === filter.key)

    if (existingFilterIndex !== -1) {
      // If the filter already exists, update it
      filters.value[existingFilterIndex] = filter
    } else {
      // If the filter does not exist, add it
      filters.value.push(filter)
    }

    fieldUnderAdding.value = null // Close the modal after adding the filter
  }

  function editColumnFilter(field: OverGridField): void {
    initiateColumnFilter(field)
  }

  function closeColumnFilterConfigModal(): void {
    fieldUnderAdding.value = null
  }

  return {
    filters,
    isFieldActive,
    toggleColumnFilter,
    fieldUnderAdding,
    closeColumnFilterConfigModal,
    registerColumnFilter,
    initiateColumnFilter,
    removeColumnFilter,
    editColumnFilter,
    returnCurrentFilter,
  }
}
