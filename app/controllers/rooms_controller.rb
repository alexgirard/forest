class RoomsController < ApplicationController 
  before_action :authenticate_user!

  def create  
    # TODO: Error check for staff that already exists
    @room = Room.create(params.require(:identifer))
    redirect_to dashboard_path
  end

  def show 
    @room = Room.find(params[:id])
    # TODO: render component: ''
  end

  # TODO: Add edit if needed

  def update 
    @room = Room.find(params[:id])
    @room.update_attributes(params.permit(:identifier))
    redirect_to dashboard_path
  end

  def destroy 
    @room = Room.find([:id])
    @room.destroy
    redirect_to dashboard_path
  end
end