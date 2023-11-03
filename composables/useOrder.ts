import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { Order, orderByOption } from '~/types/order'

export function useOrder(orderInit: Order, orderByConfig: {
  init: string
  options: orderByOption[]
}) {
  const order = ref<1 | -1>(orderInit)
  const toggleOrder = () => { order.value = order.value === 1 ? -1 : 1 }

  const orderBy = ref(orderByConfig.init)
  const currentOrderBy = computed(() => orderByConfig.options.find(option => option.id === orderBy.value))

  const sort = (data: Ref<Partial<ParsedContent>[]>) => {
    return computed(() => {
      if (!orderBy.value)
        return data.value

      return data.value.sort((a, b) => {
        const aValue = a[orderBy.value]
        const bValue = b[orderBy.value]

        if (typeof aValue === 'string' && typeof bValue === 'string')
          return aValue.localeCompare(bValue) * order.value

        if (aValue < bValue)
          return -1 * order.value

        if (aValue > bValue)
          return 1 * order.value

        return 0
      })
    })
  }

  return {
    order,
    toggleOrder,
    orderBy,
    currentOrderBy,
    sort,
  }
}
