class Api::V1::OrdersController < ApplicationController
  before_action :set_order, only: %i[ show update destroy ]

  # GET /orders
  def index
    orders_per_page = 9
    @orders = Order.order(created_at: :desc)
    paginated_orders = paginate_orders(@orders, orders_per_page)
    total_order_count = Order.count

    render json: {
      orders: paginated_orders,
      total_count: total_order_count,
      per_page: orders_per_page
    }
  end

  # GET /orders/1
  def show
    render json: @order, include: [:order_items => {:include=> [:order_item_toppings]}]
  end

  # POST /orders
  def create
    @order = Order.new(order_params)

    if @order.save
      render json: @order, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1
  def update
    if @order.update(order_params)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    @order.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def order_params
      params.require(:order).permit(
        :id,
        :customer_name,
        :customer_phone,
        :customer_email,
        :total_price,
        :completed,
        order_items_attributes: %i[
          donut_name,
          donut_price,
          order_item_toppings_attributes: %i[
            topping_name,
            topping_price
          ]
        ]
      )
    end

end
