class CreateOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :orders do |t|
      t.string :customer_name
      t.string :customer_phone
      t.string :customer_email
      t.float :total_price
      t.boolean :completed

      t.timestamps
    end
  end
end
