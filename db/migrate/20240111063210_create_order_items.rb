class CreateOrderItems < ActiveRecord::Migration[7.1]
  def change
    create_table :order_items do |t|
      t.string :donut_name
      t.float :donut_price
      t.references :order

      t.timestamps
    end
  end
end
