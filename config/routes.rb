Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: {format: :json} do
    # ...
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :show, :destroy]
    resource :videos, only: [:create, :show, :index, :destroy, :update]
    resource :comments, only: [:create, :destroy, :update]
    resource :likes, only:[:create, :destroy]

  end

  # post 'api/test', to: 'application#test'
end
