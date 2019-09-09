import { getIntervalAndEF, getDateAndSrsStage } from '../../helpers/cardHelpers'

const baseUrl = '/api/v1/decks'
const csrfToken = document.querySelector('meta[name="csrf-token"]').content

const state = {
  cards: []
}

const mutations = {
  setCards: (state, cards) => {
    state.cards = cards
  },

  setNewCard: (state, card) => {
    state.cards = [...state.cards, card]
  },

  setUpdatedCard: (state, updatedCard) => {
    state.cards = state.cards.map(card =>
      updatedCard.id === card.id ? updatedCard : card
    )
  }
}

const actions = {
  getCards: async ({ commit }, deckId) => {
    const cards = await (await fetch(`${baseUrl}/${deckId}/cards`)).json()

    commit('setCards', cards)
  },

  createCard: async ({ commit }, { deckId, body }) => {
    try {
      const card = await (await fetch(`${baseUrl}/${deckId}/cards`, {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })).json()

      commit('setNewCard', card)
    } catch (e) {
      console.error(e)
    }
  },

  updateCard: async ({ commit }, { deckId, card, quality }) => {
    try {
      const [eFactor, interval] = getIntervalAndEF(
        quality,
        card.eFactor,
        card.srsStage
      )
      const [availableDate, srsStage] = getDateAndSrsStage(
        quality,
        card.srs_stage,
        card.available_at,
        interval
      )

      const body = {
        e_factor: eFactor,
        srs_stage: srsStage,
        available_at: availableDate,
        has_been_seen: true
      }

      const updatedCard = await (await fetch(
        `${baseUrl}/${deckId}/cards/${card.id}`,
        {
          method: 'PUT',
          headers: {
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      )).json()

      commit('setUpdatedCard', updatedCard)
    } catch (e) {
      console.error(e)
    }
  }
}

const getters = {
  cardsAvailableNow: state => {
    return state.cards.filter(
      card => !card.available_at || new Date(card.available_at) >= new Date()
    )
  }
}

export default { namespaced: true, state, mutations, actions, getters }
