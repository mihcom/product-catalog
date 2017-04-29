<template lang="pug">
  div(class="product")
    img(:src="url" :name="this.product['@name']")
    div(class="price" v-html="price")
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    },

    computed: {
      url () {
        return `//www.pandora.net/assets/packshot?sku=${this.product['@id']}&format=png&width=236&height=190`
      },

      formatter () {
        return new Intl.NumberFormat('da-DK', {
          style: 'currency',
          currency: this.feed['@currency'],
          currencyDisplay: 'code',
          minimumFractionDigits: 0
        })
      },

      price () {
        const price = this.product['@price']

        return price === '0' ? '&nbsp;' : this.formatter.format(price)
      },

      ...mapState(['locale', 'feed'])
    }
  }
</script>

<style lang="stylus" scoped>
  .product
    display flex
    flex-direction column
    padding 5px
    outline 1px solid rgba(192, 192, 192, 0.4)
    cursor pointer
    transition all .5s ease

    &:hover
      transform scale(0.95)
      background-color cornsilk

    img
      width 236px
      height 190px

    .price
      text-align center
</style>
