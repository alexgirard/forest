class DashboardsController < ApplicationController 
  before_action :authenticate_user!
  
  def index
    staff = Staff.all
    patients = Patient.where(active: true)
    rooms = Room.all
    infections = Infection.all
    entries = Entry.all
    user = User.all
    render component: 'Dashboard', props: {staff: staff, patients: patients, rooms: rooms, infections: infections, entries: entries, user:user}
  end
end