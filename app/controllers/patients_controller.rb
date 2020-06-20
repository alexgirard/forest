class PatientsController < ApplicationController 
  before_action :authenticate_user!

  def create  
    # TODO: Error check for staff that already exists
    patient = Patient.create(params.require(:room).permit(:hospital_id, :active))
    redirect_to dashboard_path
  end

  def show 
    patient = Patient.find(params[:id])
    render component: 'PatientDetails', props: {patient: patient}
  end

  def update 
    patient = Patient.find(params[:id])
    patient.update_attributes(params.permit(:hospital_id, :active))
    redirect_to dashboard_path
  end

  def destroy 
    patient = Patient.find(params[:id])
    patient.destroy
  end
end