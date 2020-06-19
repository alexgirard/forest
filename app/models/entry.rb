class Entry < ApplicationRecord
  belongs_to :room
  belongs_to :staff
end