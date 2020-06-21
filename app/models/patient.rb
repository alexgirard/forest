class Patient < ApplicationRecord 
  has_many :infections
  has_many :patient_locations
  has_many :rooms, :through => :patient_locations

  def as_json(options={})
    options[:methods] = [:current_room, :entry_time, :exit_time]
    super
  end

  def current_room
    location = PatientLocation.find_by(patient_id: self.id, end_time: nil)
    if location.present?
      location.room.id 
    else 
      "None"
    end
  end

  def current_location 
    PatientLocation.find_by(patient_id: self.id, end_time: nil)
  end

  def entry_time
    location = PatientLocation.find_by(patient_id: self.id, end_time: nil)
    if location.present?
      if location.start_time.nil?
        "n/a"
      else 
        location.start_time
      end
    else 
      "n/a"
    end
  end 

  def exit_time
    location = PatientLocation.find_by(patient_id: self.id, end_time: nil)
    if location.present?
      if location.end_time.nil?
        "n/a"
      else 
        location.end_time
      end
    else 
      "n/a"
    end
  end

  def all_rooms 
    PatientLocation.where(patient_id: self.id)
  end

  def rooms_since(date, days)
    end_date = date + days.days
    locations = PatientLocation.where(patient_id: self.id, start_time: end_date..date).or(PatientLocation.where(patient_id: self.id, end_time: end_date..date))
    locations.each do |l|
      rooms << l.room 
    end
    rooms
  end
end