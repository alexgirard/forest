class PatientsController < ApplicationController 
  before_action :authenticate_user!

  def create  
    # TODO: Error check for staff that already exists
    patient = Patient.new 
    patient.hospital_id = params[:patient][:hospital_id]
    patient.active = true
    patient.save!
    location = PatientLocation.new 
    location.room_id = params[:patient][:room_id]
    location.patient_id = patient.id
    location.start_time = params[:patient][:start_time]
    location.end_time = params[:patient][:end_time]
    byebug
    location.save!
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