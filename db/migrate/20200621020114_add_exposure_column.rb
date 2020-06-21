class AddExposureColumn < ActiveRecord::Migration[6.0]
  def change
    change_table :staffs do |t|
      t.string :exposure, default: "none"
    end
  end
end
