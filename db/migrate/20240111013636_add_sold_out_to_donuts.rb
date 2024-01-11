class AddSoldOutToDonuts < ActiveRecord::Migration[7.1]
  def change
    add_column :donuts, :sold_out, :boolean
  end
end
