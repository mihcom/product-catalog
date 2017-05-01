import { memoize } from 'underscore'

const matchesFilter = (product, dimension, value) => product[dimension] === value,
  matchesFilters = (product, filters) => filters.every(([dimension, value]) => matchesFilter(product, dimension, value)),
  cache = memoize(
    (products, filters) => products.filter(product => matchesFilters(product, filters)),
    (products, filters) => filters.toString()
  )

export default (products, filters) => {
  const valuableFilters = Object.entries(filters).filter(([, value]) => value !== '')

  if (valuableFilters.length === 0) {
    return products
  }

  return cache(products, valuableFilters)
}
