import type { OverGridField } from '../types/OverGridField'
import type { OverGridOrderConfig } from '../types/OverGridOrderConfig'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { OverGridUseOrderingInterface } from '../types/OverGridUseOrderingInterface'

export default (orderConfig?: OverGridOrderConfig): OverGridUseOrderingInterface => {
  const orders: Ref<
    {
      key: string
      orderKey: string
      direction: string
    }[]
  > = ref([])

  const isFieldActive = (field: OverGridField): boolean => {
    if (!orderConfig || !orderConfig.active) {
      return false
    }

    return orders.value.some((order) => order.key === field.key)
  }

  const addOrder = (field: OverGridField) => {
    if (!orderConfig || !orderConfig.active) {
      return
    }

    if (isFieldActive(field)) {
      // already active
      return
    }

    if (!orderConfig.orderMultiple) {
      orders.value = [] // clear previous orders if multiple ordering is not allowed
    }

    orders.value.push({
      key: field.key,
      orderKey: field.orderKey || field.key,
      direction: orderConfig.initialOrderDirection || 'DESC',
    })
  }

  const removeOrder = (field: OverGridField) => {
    if (!orderConfig || !orderConfig.active) {
      return
    }

    orders.value = orders.value.filter((order) => order.key !== field.key)
  }

  const toggleField = (field: OverGridField) => {
    if (!orderConfig || !orderConfig.active) {
      return
    }

    const orderIndex = orders.value.findIndex((order) => order.key === field.key)
    if (orderIndex === -1) {
      addOrder(field)
    } else {
      const currentDirection = orders.value[orderIndex].direction
      const initialOrderDirection = orderConfig.initialOrderDirection || 'DESC'
      if (currentDirection == initialOrderDirection) {
        const newDirection = currentDirection === 'ASC' ? 'DESC' : 'ASC'
        orders.value[orderIndex].direction = newDirection
      } else {
        removeOrder(field)
      }
    }
  }

  const getFieldOrderDirection = (field: OverGridField): string | undefined => {
    if (!orderConfig || !orderConfig.active) {
      return
    }

    const order = orders.value.find((o) => o.key === field.key)
    return order ? order.direction : undefined
  }

  if (orderConfig?.defaultOrder) {
    orders.value.push({
      key: orderConfig.defaultOrder.key,
      orderKey: orderConfig.defaultOrder.orderKey || orderConfig.defaultOrder.key,
      direction: orderConfig.defaultOrder.direction,
    })
  }

  return {
    isFieldActive,
    addOrder,
    removeOrder,
    toggleField,
    getFieldOrderDirection,
    rawState: orders,
    state: orders.value,
  }
}
