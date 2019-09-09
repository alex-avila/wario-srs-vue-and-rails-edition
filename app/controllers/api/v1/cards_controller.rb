class Api::V1::CardsController < ApplicationController
  def index
    deck = Deck.find(params[:deck_id])
    cards = deck.cards.all

    render json: cards
  end

  def create
    deck = Deck.find(params[:deck_id])
    card = deck.cards.create(card_params)

    render json: card
  end

  def update
    deck = Deck.find(params[:deck_id])
    card = deck.cards.find(params[:id])
    card.update(card_update_params)

    render json: card
  end

  private
    def card_params
      params.require(:card).permit(:front, :back, :deck)
    end

    def card_update_params
      params.require(:card).permit(
        :front,
        :back,
        :e_factor,
        :srs_stage,
        :available_at,
        :has_been_seen,
        :deck
      )
    end
end
