Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: {format: :json} do
    # ...
    resources :users, only: [:create, :show, :index] do
      resources :likes, only:[:index]
    end
    resource :session, only: [:create, :show, :destroy]

    resources :likes, only:[:create, :destroy, :show]

    resources :videos, only: [:create, :index, :show, :destroy, :update] do
      resources :comments, only: [:create, :destroy, :update, :index, :show]
    end


  end

  get '*path', to: "static_pages#fronted_index"
  # get '/api/users/:user_id/likes', to: 'likes#index'
  # post 'api/test', to: 'application#test'
end
