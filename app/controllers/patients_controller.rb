class PatientsController < ApplicationController 
  before_action :authenticate_user!

  def create  
    # TODO: Error check for staff that already exists
    @patient = Patient.create(params.require(:hospital_id).permit(:active))
    redirect_to dashboard_path
  end

  def show 
    @patient = Patient.find(params[:id])
    # TODO: render component: ''
  end

  # TODO: Add edit if needed

  def update 
    @patient = Patient.find(params[:id])
    @patient.update_attributes(params.permit(:hospital_id, :active))
    redirect_to dashboard_path
  end

  def destroy 
    @patient = Patient.find([:patient])
    @patient.destroy
    redirect_to dashboard_path
  end
end