<template lang="pug">
  select.filter(@change="setFilter" ref="select")
    option(disabled :selected="nothingSelected") {{ filter['@key'] }}
    option(value="") {{ filter.allText }}
    filter-item(v-for="item in filter.item", :item="item", :filter="filter", :key="item['@key']")
</template>

<script>
  import { mapState } from 'vuex'
  import filterItem from './filter-item'

  export default {
    props: {
      filter: {
        type: Object,
        required: true
      }
    },

    computed: {
      nothingSelected () { return this.filters[this.filter.dimension] === undefined },
      ...mapState(['filters', 'feed'])
    },

    methods: {
      setFilter () {
        this.$store.commit('filter', {dimension: this.filter.dimension, value: this.$refs.select.value})
      }
    },

    components: {filterItem}
  }
</script>

<style lang="stylus" scoped>
  select
    height 30px
    font-family inherit
</style>
