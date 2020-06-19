class AddPatientLocationTable < ActiveRecord::Migration[6.0]
  def change
    create_table :patient_locations do |t|
      t.belongs_to :room
      t.belongs_to :patient
      t.datetime :start_time 
      t.datetime :end_time
      t.timestamps
    end
  end
end
