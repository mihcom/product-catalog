<template lang="pug">
  div(id="app")
    transition(name="fade" appear)
      component(:is="view")
</template>

<script>
  import { mapState } from 'vuex'
  import loading from './components/loading'
  import products from './components/products'

  export default {
    name: 'app',

    computed: {
      view () { return this.feed ? products : loading },
      ...mapState(['feed'])
    },

    components: {loading, products},

    mounted () {
      this.$store.commit('locale', window.location.pathname.slice(1))
    }
  }
</script>

<style lang="stylus">
  size = 1000px

  #app
    width size
    height size
    outline 1px solid silver
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)

    .fade-enter-active, .fade-leave-active
      transition all 1s
      position absolute

    .fade-enter, .fade-leave-to
      opacity 0
      transform translateY(30px)
</style>
