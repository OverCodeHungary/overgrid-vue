import type { Ref } from 'vue'
export interface OverGridUseExtraRowInterface {
  openedRows: Ref<string[]>
  isRowOpened: (id?: string) => boolean
  openRow: (id?: string) => void
  closeRow: (id?: string) => void
  toggleRow: (id?: string) => void
}
