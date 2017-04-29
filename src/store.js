import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const feedPlugin = store => {
  store.watch(state => state.locale, function loadFeed () {
    const locale = window.location.pathname.slice(1),
      feedUrl = `//www.pandora.net/${locale}/feeds/products/json`

    this.$http.get(feedUrl).then(response => {
      store.commit('feed', response.body.data)
    })
  })

  store.watch(state => state.feed, function setProducts (feed) {
    store.commit('products', feed.products.product)
  })

  store.watch(state => state.filters, function calculateProducts (filters) {
    const entries = Object.entries(filters).filter(([, value]) => value !== ''),
      matchesFilters = product => entries.every(pair => {
        const [dimension, value] = pair

        return product[dimension] === value
      }),
      products = store.getters.feed.products.product.filter(matchesFilters)

    store.commit('products', products)
  })
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    feed: undefined,
    products: undefined,
    locale: undefined,
    filters: {}
  },

  mutations: {
    feed (state, feed) { state.feed = feed },
    products (state, products) { state.products = products },
    locale (state, locale) { state.locale = locale },
    filter (state, filter) {
      const filters = {...state.filters}

      filters[filter.dimension] = filter.value

      state.filters = filters
    },

    filters (state, filters) { state.filters = filters }
  },

  actions: {
    clearFilters (store) {
      store.commit('filters', {})
    }
  },

  getters: {
    feed: state => state.feed
  },

  plugins: [feedPlugin]
})
