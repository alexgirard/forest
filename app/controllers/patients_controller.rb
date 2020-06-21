class PatientsController < ApplicationController 
  before_action :authenticate_user!

  def create  
    # TODO: Error check for staff that already exists
    patient = Patient.new 
    patient.hospital_id = params[:patient][:hospital_id]
    patient.active = true
    patient.save!
    location = PatientLocation.new 
    room = Room.find_by(identifier: params[:patient][:current_room])
    location.room_id = room.id
    location.patient_id = patient.id
    location.start_time = params[:patient][:start_time]
    location.end_time = params[:patient][:end_time]
    location.save!
  end

  def show 
    patient = Patient.find(params[:id])
    render component: 'PatientDetails', props: {patient: patient}
  end

  def update 
    patient = Patient.find(params[:id])
    location = PatientLocation.find_by(patient_id: params[:id], end_time: nil)
    if params[:patient][:current_room].present?
      if location.present?
        location.end_time = Time.now
        location.save!
      end
      location = PatientLocation.new 
      room = Room.find_by(identifier: params[:patient][:current_room])
      location.room_id = room.id
      location.patient_id = patient.id 
      location.start_time = Time.now
      location.save!
    elsif params[:patient][:entry_time].present?
      location.start_time = params[:patient][:entry_time]
    elsif params[:patient][:exit_time].present?
      location.end_time = params[:patient][:exit_time]
    end
    location.save!
    patient.save!
    # patient.update_attributes(params.permit(:hospital_id, :active))
  end

  def destroy 
    patient = Patient.find(params[:id])
    location = PatientLocation.find_by(patient_id: params[:id], end_time: nil)
    if location.present?
      location.end_time = Time.now
      location.save!
    end
    patient.destroy
  end
end