class CreateDonuts < ActiveRecord::Migration[7.1]
  def change
    create_table :donuts do |t|
      t.string :name
      t.text :description
      t.float :price

      t.timestamps
    end
  end
end
