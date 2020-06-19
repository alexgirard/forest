class AddStaffTable < ActiveRecord::Migration[6.0]
  def change
    create_table :staffs do |t|
      t.integer :badge, :null => false
      t.string :first_name, :null => false
      t.string :last_name, :null => false 
      t.string :email
      t.string :phone
    end
  end
end
