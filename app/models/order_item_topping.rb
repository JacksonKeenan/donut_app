class OrderItemTopping < ApplicationRecord
  belongs_to :order_item, inverse_of: :order_item_toppings

  validates :topping_name, presence: true
  validates :topping_price, presence: true
end
