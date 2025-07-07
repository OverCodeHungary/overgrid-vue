import type { Ref } from 'vue'
import type { OverGridColumnFilter } from './OverGridColumnFilter'
import type { OverGridField } from './OverGridField'

export interface OverGridUseColumnFiltersInterface {
  filters: Ref<OverGridColumnFilter[]>
  isFieldActive: (field: OverGridField) => boolean
  toggleColumnFilter: (field: OverGridField) => void
  fieldUnderAdding: Ref<OverGridField | null>
  closeColumnFilterConfigModal: () => void
  registerColumnFilter: (filter: OverGridColumnFilter) => void
  initiateColumnFilter: (field: OverGridField) => void
  removeColumnFilter: (field: OverGridField) => void
  editColumnFilter: (field: OverGridField) => void
  returnCurrentFilter: (field: OverGridField) => OverGridColumnFilter | undefined
}
