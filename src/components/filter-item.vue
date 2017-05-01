<template lang="pug">
  option(:value="item['@key']", :selected="selected", :disabled="matchedProductsCount === 0")
    | {{ item['@value'] }} ({{ matchedProductsCount }})
</template>

<script>
  import { mapState } from 'vuex'
  import productsCalculator from '../services/products-calculator'
  import hash from 'object-hash'
  import { memoize } from 'underscore'

  export default {
    props: {
      filter: {
        type: Object,
        required: true
      },
      item: {
        type: Object,
        required: true
      }
    },

    computed: {
      selected () {
        return Object.entries(this.filters)
          .find(([dimension, value]) => this.filter.dimension === dimension && this.item['@key'] === value)
      },

      matchedProductsCount: memoize(function () {
        const filters = Object.assign({}, this.filters, {})

        filters[this.filter.dimension] = this.item['@key']

        return productsCalculator(this.releasedProducts, filters).length
      }, function () { return `${this.filter.dimension}_${this.item['@key']}_${hash(this.filters)}` }),

      ...mapState(['releasedProducts', 'filters'])
    }
  }
</script>
