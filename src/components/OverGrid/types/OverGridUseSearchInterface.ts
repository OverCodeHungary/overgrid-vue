import type { Ref } from 'vue'

export interface OverGridUseSearchInterface {
  query: Ref<string>
  debounce: (func: Function) => void
}
