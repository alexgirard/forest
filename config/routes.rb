Rails.application.routes.draw do
  root 'homepage#index'
  
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
end
