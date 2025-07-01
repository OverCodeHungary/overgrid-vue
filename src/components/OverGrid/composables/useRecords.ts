import { ref, nextTick } from 'vue'
import type { OverGridConfig } from '../types/OverGridConfig'
import usePagination from './usePagination'
import useLogger from './useLogger'
import axios from 'axios'
import DefaultServerTransformation from '../serverTransformations/DefaultServerTransformation'

export default (gridConfig: OverGridConfig) => {
  const records = ref<any[]>([])
  const pagination = usePagination(gridConfig.pagination)
  const logger = useLogger()

  const fetchRecords = async () => {
    let response = await axios.get(gridConfig.endpoint, {
      params: gridConfig.serverTransformation
        ? gridConfig.serverTransformation(null, pagination.state, null)
        : DefaultServerTransformation(null, pagination.state, null),
      responseType: 'json',
    })

    pagination.setByResponse(response.data)

    // @TODO: Event handling: registeredEvents.onDataLoad

    let cRecords =
      gridConfig.rootkey && response.data[gridConfig.rootkey]
        ? response.data[gridConfig.rootkey]
        : response.data

    if (!Array.isArray(cRecords)) {
      logger.error(
        'The response data is not an array. Please check your server response format and the "rootkey" configuration.',
      )
      cRecords = []
    }

    if (gridConfig.events && gridConfig.events.onDataLoad) {
      let eventResult = gridConfig.events.onDataLoad(cRecords)
      if (typeof eventResult == 'object') {
        cRecords = eventResult
      }
    }

    if (gridConfig.events && gridConfig.events.onDataLoadWithFullResponse) {
      gridConfig.events.onDataLoadWithFullResponse(response)
    }

    records.value = cRecords || []

    nextTick(function () {
      if (gridConfig.events && gridConfig.events.readyAfterRefresh) {
        gridConfig.events?.readyAfterRefresh()
      }
    })
  }

  return {
    records,
    fetchRecords,
  }
}
