Rails.application.routes.draw do
  namespace :api do 
    resources :fruits, only: [:index, :create,:show, :destroy, :update]
  end 

  root :to => "home#index"
end
