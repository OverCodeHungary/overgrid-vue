import type { Ref, ComputedRef } from 'vue'
import { OverGridField } from '../types/OverGridField'

export interface OverGridUseColumnSelectorInterface {
  showModal: () => void
  closeModal: () => void
  isModalShown: Ref<boolean>
  setColumns: (selectedColumns: string[]) => void
  selectedFields: Ref<string[] | null>
  filter(fields: OverGridField[]): OverGridField[]
  isToolbarOptionEnabled: ComputedRef<boolean>
}
