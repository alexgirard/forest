Rails.application.routes.draw do
  root 'homepage#index'
  get 'dashboard', to: 'dashboard#index'

  resources :staffs
  
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
end
