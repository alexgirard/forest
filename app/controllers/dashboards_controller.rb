class DashboardsController < ApplicationController 
  before_action :authenticate_user!
  
  def index
    staff = Staff.all
    patients = Patient.where(active: true)
    rooms = Room.all
    render component: 'Dashboard', props: {staff: staff, patients: patients, rooms: rooms}
  end
end