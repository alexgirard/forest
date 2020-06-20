Rails.application.routes.draw do
  root 'homepage#index'
  get 'dashboard', to: 'dashboards#index'

  resources :staffs
  resources :rooms
  resources :patients
  resources :infections
  resources :entries, only: [:index, :create]
  
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
end
