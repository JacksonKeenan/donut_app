class Api::V1::ToppingsController < ApplicationController
  before_action :set_topping, only: %i[ show update destroy ]

  # GET /toppings
  def index
    toppings_per_page = 9
    @toppings = Topping.order(created_at: :desc)
    toppings_with_images = paginate_items(@toppings, toppings_per_page)
    total_topping_count = Topping.count

    render json: {
      toppings: toppings_with_images,
      total_count: total_topping_count,
      per_page: toppings_per_page
    }
  end

  # GET /toppings/1
  def show
    if @topping.image.attached?
      render json: @topping.as_json.merge(image_url: url_for(@topping.image))
    else
      render json: @topping.as_json.merge(image_url: nil)
    end
  end

  # POST /toppings
  def create
    @topping = Topping.new(topping_params)

    if @topping.save
      render json: @topping, status: :created, location: api_v1_topping_url(@topping)
    else
      render json: @topping.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /toppings/1
  def update
    if @topping.update(topping_params)
      render json: @topping
    else
      render json: @topping.errors, status: :unprocessable_entity
    end
  end

  # DELETE /toppings/1
  def destroy
    @topping.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_topping
      @topping = Topping.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def topping_params
      params.require(:topping).permit(:name, :price, :image, :sold_out)
    end
end
