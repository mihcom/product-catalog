<template lang="pug">
  div.filters
    collection-filter(v-for="filter in filters", :filter="filter", :key="filter['@key']")
    a.clear-filters(href="#", @click.prevent="clearFilters" v-if="hasAppliedFilters") clear
</template>

<script>
  import { mapState } from 'vuex'
  import filter from './filter'

  export default {
    computed: {
      filters () {
        const groups = this.feed.groups.group,
          findGroup = key => groups.find(group => group['@key'] === key),
          buildFilter = spec => {
            const group = findGroup(spec[0])

            return {
              allText: spec[1],
              dimension: spec[2],
              ...group
            }
          }

        return [
          ['Category', 'All categories', '@cat'],
          ['Metal', 'All metals', '@metal'],
          ['Material', 'All materials', '@material'],
          ['Stone', 'All stones', '@stone']]
          .map(buildFilter)
      },

      hasAppliedFilters () {
        return Object.entries(this.appliedFilters)
            .filter(([, value]) => value !== '')
            .length > 0
      },

      ...mapState({
        feed: state => state.feed,
        appliedFilters: state => state.filters
      })
    },

    components: {'collection-filter': filter},

    methods: {
      clearFilters () {
        this.$store.dispatch('clearFilters')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .filters
    padding 5px 0
    border-bottom 1px solid silver
    display flex
    justify-content space-between
    align-items center
    box-sizing border-box
    flex-shrink 0

    .filter
      margin 0 5px
      width 25%

    .clear-filters
      padding 0 5px
</style>
