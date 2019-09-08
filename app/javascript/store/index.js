import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const baseUrl = '/api/v1/decks'
const csrfToken = document.querySelector('meta[name="csrf-token"]').content

const store = new Vuex.Store({
  state: {
    decks: [],
    activeDeck: {}
  },

  mutations: {
    setDecks: (state, decks) => (state.decks = decks),

    setActiveDeck: (state, deck) => (state.activeDeck = deck),

    setNewDeck: (state, deck) => (state.decks = [...state.decks, deck]),

    removeDeck: (state, id) =>
      (state.decks = state.decks.filter(deck => deck.id !== id))
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

    getDeck: async ({ commit }, id) => {
      const deck = await (await fetch(`${baseUrl}/${id}`)).json()
      commit('setActiveDeck', deck)
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
    },

    deleteDeck: async ({ commit }, { id, successCallback }) => {
      try {
        console.log(`${baseUrl}/${id}`)
        await fetch(`${baseUrl}/${id}`, {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'application/json'
          }
        })

        commit('removeDeck', id)

        successCallback()
      } catch (e) {
        console.error(e)
      }
    }
  }
})

export default store
