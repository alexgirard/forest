class StaffsController < ApplicationController 
  before_action :authenticate_user!

  def create  
    # TODO: Error check for staff that already exists
    staff = Staff.create(params.require(:staff).permit(:badge, :first_name, :last_name, :email, :phone))
  end

  def show 
    staff = Staff.find(params[:id])
    render component: 'StaffDetails', props: {staff: staff}
  end

  def update 
    @staff = Staff.find(params[:id])
    @user.update_attributes(params.permit(:badge, :first_name, :last_name, :email, :phone))
    redirect_to dashboard_path
  end

  def destroy 
    @staff = Staff.find([:id])
    @staff.destroy
    redirect_to dashboard_path
  end
end