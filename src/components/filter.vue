<template lang="pug">
  select(class="filter" @change="setFilter" ref="select")
    option(disabled :selected="nothingSelected") {{ filter['@key'] }}
    option(value="") {{ filter.allText }}
    option(v-for="item in filter.item" :key="item['@key']" :value="item['@key']" :selected="selected(item)") {{ item['@value'] }}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      filter: {
        type: Object,
        required: true
      }
    },

    computed: {
      nothingSelected () { return this.filters[this.filter.dimension] === undefined },
      ...mapState(['filters'])
    },

    methods: {
      setFilter () {
        this.$store.commit('filter', {dimension: this.filter.dimension, value: this.$refs.select.value})
      },

      selected (item) {
        return Object.entries(this.filters)
          .find(([dimension, value]) => this.filter.dimension === dimension && item['@key'] === value)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  select
    height 30px
</style>
