import type { Ref } from 'vue'
import { OverGridField } from '../types/OverGridField'

export interface OverGridUseColumnSelectorInterface {
  showModal: () => void
  closeModal: () => void
  isModalShown: Ref<boolean>
  setColumns: (selectedColumns: string[]) => void
  selectedFields: Ref<string[] | null>
  filter(fields: OverGridField[]): OverGridField[]
}
