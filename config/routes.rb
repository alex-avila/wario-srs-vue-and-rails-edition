Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :decks do
        resources :cards
      end
    end
  end

  root 'homepage#index'

  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
