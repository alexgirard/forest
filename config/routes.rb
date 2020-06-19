Rails.application.routes.draw do
  root 'homepage#index'
  get 'dashboard', to: 'dashboard#index'

  resources :staffs
  resources :rooms
  resources :patients
  
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
end
