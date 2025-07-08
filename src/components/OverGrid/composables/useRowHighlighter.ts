import type { OverGridRowHighlighterConfig } from '../types/OverGridRowHighlighterConfig'
import type { OverGridUseRowHighlighterInterface } from '../types/OverGridUseRowHighlighterInterface'
import useLogger from './useLogger'

export default (rowHighlighterConfig?: OverGridRowHighlighterConfig): OverGridUseRowHighlighterInterface => {
  const logger = useLogger()

  function getClassList(record: any): string {
    if (!rowHighlighterConfig?.active) {
      return ''
    }

    if (rowHighlighterConfig?.fn && typeof rowHighlighterConfig.fn === 'function' && rowHighlighterConfig?.fn(record)) {
      return rowHighlighterConfig.classList + ' overgrid-row-highlighted' || ''
    } else {
      logger.warn('Row highlighter configuration is not defined a function in "fn" key.')
      return ''
    }
  }

  return {
    getClassList,
  }
}
