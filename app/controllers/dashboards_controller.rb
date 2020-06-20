class DashboardsController < ApplicationController 
  before_action :authenticate_user!
  
  def index
    staff = Staff.all
    patients = Patient.where(active: true)
    rooms = Room.all
    infections = Infection.all
    render component: 'Dashboard', props: {staff: staff, patients: patients, rooms: rooms, infections: infections}
  end
end