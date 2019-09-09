class Api::V1::DecksController < ApplicationController
  def index
    decks = Deck.all

    render json: decks
  end

  def show
    deck = Deck.find(params[:id])
    cards = deck.cards.all

    deckAttributes = deck.attributes.map { |key, value| [key.to_sym, value] }.to_h

    deckWithCards = {
      **deckAttributes,
      cards: deck.cards.all
    }

    render json: deckWithCards
  end

  def create
    deck = Deck.new(deck_params)

    if deck.save
      render json: deck
    else
      render json: deck.errors
    end
  end

  def destroy
    deck = Deck.find(params[:id])
    deck.destroy
  end

  private
    def deck_params
      params.require(:deck).permit(:name, :description)
    end
end
