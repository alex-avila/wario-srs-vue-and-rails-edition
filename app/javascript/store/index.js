import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const baseUrl = '/api/v1/decks/'
const csrfToken = document.querySelector('meta[name="csrf-token"]').content

const store = new Vuex.Store({
  state: {
    decks: []
  },

  mutations: {
    setDecks: (state, decks) => (state.decks = decks),

    setNewDeck: (state, deck) => (state.decks = [...state.decks, deck])
  },

  actions: {
    getDecks: async ({ commit }) => {
      try {
        const decks = await (await fetch(baseUrl)).json()
        commit('setDecks', decks)
      } catch (e) {
        console.error(e)
      }
    },

    addDeck: async ({ commit }, body) => {
      try {
        const deck = await (await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })).json()

        commit('setNewDeck', deck)
      } catch (e) {
        console.error(e)
      }
    }
  }
})

export default store
