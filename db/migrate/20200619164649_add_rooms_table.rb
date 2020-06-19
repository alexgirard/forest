class AddRoomsTable < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.string :identifier, :null => false
      t.timestamps
    end
  end
end
