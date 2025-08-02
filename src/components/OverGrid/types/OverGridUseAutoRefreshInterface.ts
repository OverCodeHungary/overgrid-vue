import type { Ref, ComputedRef } from 'vue'

export interface OverGridUseAutoRefreshInterface {
  changeAutoRefreshValue: (value: string) => void
  autoRefresh: Ref<string>
  isToolbarOptionEnabled: ComputedRef<boolean>
}
