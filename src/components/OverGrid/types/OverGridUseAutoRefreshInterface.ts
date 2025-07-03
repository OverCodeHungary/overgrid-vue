import type { Ref } from 'vue'

export interface OverGridUseAutoRefreshInterface {
  changeAutoRefreshValue: (value: string) => void
  autoRefresh: Ref<string>
}
