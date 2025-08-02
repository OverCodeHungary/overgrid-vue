import type { Ref, ComputedRef } from 'vue'

export interface OverGridUseSearchInterface {
  query: Ref<string>
  debounce: (func: Function) => void
  isToolbarOptionEnabled: ComputedRef<boolean>
}
