<template lang="pug">
  div(class="products")
    filters
    transition(name="results-transition" mode="out-in")
      transition-group(tag="div" class="products-list" key="products" v-if="products && products.length" name="list-transition")
        product(v-for="product in products" :product="product" :key="product['@id']")
        div(class="load-more" key="load-more" @click="loadMore" v-show="products.length < allProducts.length") Load more
      div(class="no-results" key="no-products" v-if="products && !products.length")
        div No products match selected criteria.
</template>

<script>
  import { mapState } from 'vuex'

  import filters from './filters'
  import product from './product'

  export default {
    data () {
      return {
        batchSize: 0,
        products: undefined
      }
    },

    computed: mapState({allProducts: state => state.products}),

    components: {filters, product},

    mounted () {
      this.loadMore()
    },

    watch: {
      allProducts () {
        this.batchSize = 0
        this.loadMore()
      }
    },

    methods: {
      loadMore () {
        this.batchSize += 40

        this.products = this.allProducts.slice(0, this.batchSize)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .products
    height 100%
    width 100%
    display flex
    flex-direction column

    .products-list
      display flex
      flex-wrap wrap
      overflow auto
      justify-content center

      .load-more
        background-color cornsilk
        width: 100%
        text-align center
        padding 20px
        margin 10px 2px
        border 1px solid burlywood
        box-sizing border-box
        border-radius 5px
        cursor pointer
        transition all .5s ease

        &:hover
          background-color #fff7a1

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
      transform scale(0.95)

    .list-transition-enter-active, .list-transition-leave-active
      transition transition

    .list-transition-leave-active
      display none

    .list-transition-enter, .list-transition-leave-to
      opacity 0
      transform scale(0.95)

    .list-transition-move
      transition transition
</style>
