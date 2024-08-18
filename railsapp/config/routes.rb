Rails.application.routes.draw do
  get 'home/index'
  root to: "home#index" # Set your root route
  devise_for :users
end
