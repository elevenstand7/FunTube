Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: {format: :json} do
    # ...
    resources :users, only: [:create, :show, :index]
    resource :session, only: [:create, :show, :destroy]

    resources :videos, only: [:create, :index, :show, :destroy, :update] do
      resources :comments, only: [:create, :destroy, :update]
      resources :likes, only:[:create, :destroy]
    end
  end

  get '*path', to: "static_pages#fronted_index"

  # post 'api/test', to: 'application#test'
end
