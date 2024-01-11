class OrderItem < ApplicationRecord
  belongs_to :order, inverse_of: :order_items
  has_many :order_item_toppings, dependent: :destroy

  accepts_nested_attributes_for :order_item_toppings

  validates :donut_name, presence: true
  validates :donut_price, presence: true
end
