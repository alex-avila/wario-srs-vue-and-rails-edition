import Vue from 'vue'
import Vuex from 'vuex'
import decks from './modules/decks'
import cards from './modules/cards'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    decks,
    cards
  }
})

export default store
