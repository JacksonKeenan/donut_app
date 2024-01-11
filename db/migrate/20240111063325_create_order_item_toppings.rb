class CreateOrderItemToppings < ActiveRecord::Migration[7.1]
  def change
    create_table :order_item_toppings do |t|
      t.string :topping_name
      t.float :topping_price

      t.references :order_item
      t.timestamps
    end
  end
end
