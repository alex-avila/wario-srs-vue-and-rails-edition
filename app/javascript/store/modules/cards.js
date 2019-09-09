const baseUrl = '/api/v1/decks'
const csrfToken = document.querySelector('meta[name="csrf-token"]').content

const actions = {
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

      console.log(card)

      // commit('setNewCard', deck)
    } catch (e) {
      console.error(e)
    }
  },

  updateCard: async ({ commit }, { deckId, cardId, srsState }) => {
    const card = await (await fetch(`${baseUrl}/${deckId}/cards`, {
      method: 'PUT',
      headers: {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ srs_stage: srsStage })
    })).json()
  }
}

export default { namespaced: true, actions }
