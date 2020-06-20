class Infection < ApplicationRecord 
  belongs_to :patient

  def as_json(options={})
    options[:methods] = [:patient_hospital_id]
    super
  end

  def patient_hospital_id
    patient = self.patient 
    patient.hospital_id
  end
end