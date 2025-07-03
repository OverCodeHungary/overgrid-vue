import type { OverGridField } from './OverGridField'
import type { Ref } from 'vue'

export interface OverGridUseOrderingInterface {
  isFieldActive: (field: OverGridField) => boolean
  addOrder: (field: OverGridField) => void
  removeOrder: (field: OverGridField) => void
  toggleOrderDirection: (field: OverGridField) => void
  getFieldOrderDirection: (field: OverGridField) => string | undefined
  rawState: Ref<
    {
      key: string
      direction: string
    }[]
  >
  state: {
    key: string
    direction: string
  }[]
}
