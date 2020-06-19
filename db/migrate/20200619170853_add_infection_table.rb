class AddInfectionTable < ActiveRecord::Migration[6.0]
  def change
    create_table :infections do |t|
      t.belongs_to :patient
      t.text :notes 
      t.datetime :start
      t.datetime :end 
      t.integer :incubation
      t.integer :steps
    end
  end
end
