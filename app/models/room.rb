class Room < ApplicationRecord
  has_many :entries
  has_many :staffs, :through => :entries
  has_many :patient_locations
  has_many :patients, :through => :patient_locations

  def as_json(options={})
    options[:methods] = [:current_patient]
    super
  end

  def current_patient 
    location = PatientLocation.find_by(room_id: self.id, end_time: nil)
    if location 
      location.patient.hospital_id
    else 
      "Empty"
    end
  end
end