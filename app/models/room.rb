class Room < ApplicationRecord
  has_many :entries
  has_many :staffs, :through => :entries
  has_many :patient_locations
  has_many :patients, :through => :patient_locations
end