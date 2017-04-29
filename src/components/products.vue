<template lang="pug">
  div(class="products")
    filters
    transition(name="results-transition" mode="out-in")
      transition-group(tag="div" class="products-list" key="products" v-if="products.length" name="list-transition")
        product(v-for="product in products.slice(0, 48)" :product="product" :key="product['@id']")
      div(class="no-results" key="no-products" v-else)
        div No products match selected criteria.
</template>

<script>
  import { mapState } from 'vuex'

  import filters from './filters'
  import product from './product'

  export default {
    computed: mapState(['products', 'locale']),

    components: {filters, product}
  }
</script>

<style lang="stylus" scoped>
  .products
    height 100%
    display flex
    flex-direction column

    .products-list
      display flex
      flex-wrap wrap
      overflow auto
      justify-content center

    .no-results
      display flex
      flex-grow 1
      justify-content center
      align-items center

    transition = all 1s ease

    .results-transition-enter-active, .results-transition-leave-active
      transition transition

    .results-transition-enter, .results-transition-leave-to
      opacity 0
      transform scale(0.9)

    .list-transition-enter-active, .list-transition-leave-active
      transition transition

    .list-transition-enter, .list-transition-leave-to
      opacity 0
      transform scale(0.9)

    .list-transition-move
      transition transition
</style>
