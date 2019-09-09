import { getIntervalAndEF, getDateAndSrsStage } from '../../helpers/cardHelpers'
import moment from 'moment'

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
        card.e_factor,
        card.srs_stage
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
      card => !card.available_at || new Date(card.available_at) <= new Date()
    )
  },

  nextReviewDate: (state, getters) => {
    if (getters.cardsAvailableNow.length) {
      return 'now'
    }

    if (state.cards.length) {
      const sortedCards = state.cards.sort((a, b) => {
        return new Date(a.available_at) - new Date(b.available_at)
      })

      return moment(
        new Date(sortedCards[0].available_at).toUTCString()
      ).fromNow()
    }

    return 'never'
  },

  cardsAvailableTomorrowNum: (state, getters) => {
    const now = new Date()
    return state.cards
      .filter(card => !getters.cardsAvailableNow.includes(card))
      .filter(
        card =>
          now.getUTCDate() + 1 === new Date(card.available_at).getUTCDate()
      ).length
  }
}

export default { namespaced: true, state, mutations, actions, getters }
