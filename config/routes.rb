Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: {format: :json} do
    # ...
    get 'videos/search', to: "videos#search"
    resources :users, only: [:create, :show, :index] do
      resources :likes, only:[:index]
    end
    resource :session, only: [:create, :show, :destroy]

    resources :likes, only:[:create, :destroy, :show]

    resources :videos, only: [:create, :index, :show, :destroy, :update] do
      resources :comments, only: [:create, :index, :show]
    end
    resources :comments, only: [:destroy, :update]

  end

  get '*path', to: "static_pages#frontend_index"

end
