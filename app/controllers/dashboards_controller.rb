class DashboardsController < ApplicationController 
  before_action :authenticate_user!
  
  def index
    staff = Staff.all
    render component: 'Dashboard', props: {staff: staff}
  end
end