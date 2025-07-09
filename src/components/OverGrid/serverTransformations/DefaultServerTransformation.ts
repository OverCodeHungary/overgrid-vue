export default (orders: any, pagination: any, columnFilters: any, searchQuery?: string): URLSearchParams => {
  let result = new URLSearchParams()
  // result.set('orders', JSON.stringify(orders))
  // result.set('pagination', JSON.stringify(pagination))
  // result.set('filters', JSON.stringify(filters))

  if (pagination && (pagination.page || pagination.page === 0) && pagination.pageSize) {
    result.set('page', pagination.page.toString())
    result.set('size', pagination.pageSize.toString())
  }

  if (orders && Array.isArray(orders) && orders.length > 0) {
    result.set('orders', JSON.stringify(orders))
  }

  if (columnFilters && Array.isArray(columnFilters) && columnFilters.length > 0) {
    result.set('filters', JSON.stringify(columnFilters))
  }

  if (searchQuery && typeof searchQuery == 'string' && searchQuery.trim().length > 0) {
    result.set('query', searchQuery.trim())
  }

  return result
}
