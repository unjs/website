import type { Order } from '~/types/order'

export const sort = function<T extends Record<string, string>>(data: T[], order: Order, orderBy: string) {
  if (!orderBy)
    return data

  return data.sort((a, b) => {
    const aValue = a[orderBy] as unknown
    const bValue = b[orderBy] as unknown

    if (typeof aValue === 'number' && typeof bValue === 'number')
      return (aValue - bValue) * order

    if (typeof aValue === 'string' && typeof bValue === 'string')
      return aValue.localeCompare(bValue) * order

    return 0
  })
}
