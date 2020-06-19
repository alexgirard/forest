class DashboardsController < ApplicationController 
  before_action :authenticate_user!
  
  def index
    render component: 'Dashboard'
  end
end