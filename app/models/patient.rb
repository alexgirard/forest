class Patient < ApplicationRecord 
  has_many :infections
  has_many :patient_locations
  has_many :rooms, :through => :patient_locations
end