class Api::V1::CardsController < ApplicationController
  def index
    cards = Card.all

    render json: cards
  end

  def create
    @deck = Deck.find(params[:deck_id])
    card = @deck.cards.create(card_params)

    render json: card
  end

  private
    def card_params
      params.require(:card).permit(:front, :back, :deck)
    end
end
