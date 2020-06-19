class AddPatientTable < ActiveRecord::Migration[6.0]
  def change
    create_table :patients do |t|
      t.integer :hospital_id, :null => false
      t.boolean :active, :default => true, :null => false
      t.timestamps
    end
  end
end
