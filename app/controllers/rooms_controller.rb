class RoomsController < ApplicationController 
  before_action :authenticate_user!

  def create  
    # TODO: Error check for staff that already exists
    room = Room.create(params.require(:room).permit(:identifier))
    redirect_to dashboard_path
  end

  def show 
    room = Room.find(params[:id])
    render component: 'RoomDetails', props: {room: room}
  end

  def update 
    room = Room.find(params[:id])
    room.update_attributes(params.permit(:identifier))
    redirect_to dashboard_path
  end

  def destroy 
    room = Room.find(params[:id])
    room.destroy
  end
end