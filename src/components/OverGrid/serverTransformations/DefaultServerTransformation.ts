export default (orders: any, pagination: any, filters: any): URLSearchParams => {
  let result = new URLSearchParams()
  // result.set('orders', JSON.stringify(orders))
  // result.set('pagination', JSON.stringify(pagination))
  // result.set('filters', JSON.stringify(filters))

  if (pagination && (pagination.page || pagination.page === 0) && pagination.pageSize) {
    result.set('page', pagination.page.toString())
    result.set('size', pagination.size.toString())
  }

  console.log('Server transformation orders:', orders)
  console.log('Server transformation pagination:', pagination)
  console.log('Server transformation filters:', filters)

  return result
}
