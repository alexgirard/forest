class AddEntryTable < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t| 
      t.belongs_to :staff 
      t.belongs_to :room
      t.datetime :time 
      t.timestamps
    end
  end
end
