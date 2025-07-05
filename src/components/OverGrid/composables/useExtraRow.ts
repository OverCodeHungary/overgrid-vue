import type { OverGridExtraRowConfig } from '../types/OverGridExtraRowConfig'
import type { OverGridUseExtraRowInterface } from '../types/OverGridUseExtraRowInterface'
import useLogger from './useLogger'
import { ref } from 'vue'

export default (extraRowConfig?: OverGridExtraRowConfig, idkey?: string): OverGridUseExtraRowInterface => {
  const logger = useLogger()

  const openedRows = ref<string[]>([])

  if (extraRowConfig && extraRowConfig.active && !idkey) {
    logger.warn(
      'Extra row functionality is active in configuration, but no idkey is provided (its required). Please provide an idkey to enable extra row functionality.',
    )
  }

  function openRow(id?: string): void {
    if (!id) {
      return
    }

    openedRows.value.push(id)
  }

  function closeRow(id?: string): void {
    if (!id) {
      return
    }

    const index = openedRows.value.indexOf(id)
    if (index !== -1) {
      openedRows.value.splice(index, 1)
    }
  }

  function toggleRow(id?: string): void {
    if (!id) {
      return
    }

    if (isRowOpened(id)) {
      closeRow(id)
    } else {
      openRow(id)
    }
  }

  function isRowOpened(id?: string): boolean {
    if (!id) {
      return false
    }

    return openedRows.value.includes(id)
  }

  return {
    openedRows,
    isRowOpened,
    toggleRow,
    openRow,
    closeRow,
  }
}
