class Api::V1::SearchController < ApplicationController
  def donuts
    donuts_per_page = 9
    @donuts = Donut.where("name LIKE ? OR description LIKE ?", "%#{params[:q]}%", "%#{params[:q]}%").order(created_at: :desc)
    donuts_with_images = paginate_items(@donuts, donuts_per_page)
    total_donut_count = @donuts.count

    render json: {
      donuts: donuts_with_images,
      total_count: total_donut_count,
      per_page: donuts_per_page
    }
  end

  def toppings
    toppings_per_page = 9
    @toppings = Topping.where("name LIKE ?", "%#{params[:q]}%").order(created_at: :desc)
    toppings_with_images = paginate_items(@toppings, toppings_per_page)
    total_topping_count = @toppings.count

    render json: {
      toppings: toppings_with_images,
      total_count: total_topping_count,
      per_page: toppings_per_page
    }
  end

  def orders
    orders_per_page = 9
    @orders = Order.where("id LIKE ? OR customer_name LIKE ?", "%#{params[:q]}%", "%#{params[:q]}%").order(created_at: :desc)
    orders_with_images = paginate_orders(@orders, orders_per_page)
    total_order_count = @orders.count

    render json: {
      orders: orders_with_images,
      total_count: total_order_count,
      per_page: orders_per_page
    }
  end
end
