class EntriesController < ApplicationController 

  def index 
    render component: 'Entry'
  end

  def create 
    entry = Entry.new 
    entry.time = Time.now
    entry.staff = Staff.find_by(badge: params[:entry][:badge])
    entry.room = Room.find(params[:entry][:room_id])
    entry.save!
  end
end