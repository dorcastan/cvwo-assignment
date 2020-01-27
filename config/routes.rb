Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "home#index"

  namespace :api do
    jsonapi_resources :todos, only: [:index, :create, :update, :destroy]
    jsonapi_resources :tags
  end
  
  resources :users, only: [:create]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  # All other routes are handled by the front-end
  get "*path", to: "home#index", constraints: { format: "html" }
  
end
