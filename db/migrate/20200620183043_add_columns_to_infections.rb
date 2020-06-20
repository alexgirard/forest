class AddColumnsToInfections < ActiveRecord::Migration[6.0]
  def change
    change_table :infections do |t|
      t.string :hai
      t.string :status
    end
  end
end
