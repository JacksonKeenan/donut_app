class Api::V1::DonutsController < ApplicationController
  before_action :set_donut, only: %i[ show update destroy ]

  # GET /donuts
  def index
    donuts_per_page = 9
    @donuts = Donut.order(created_at: :desc)
    donuts_with_images = paginate_items(@donuts, donuts_per_page)
    total_donut_count = Donut.count

    render json: {
      donuts: donuts_with_images,
      total_count: total_donut_count,
      per_page: donuts_per_page
    }
  end

  # GET /donuts/1
  def show
    if @donut.image.attached?
      render json: @donut.as_json.merge(image_url: url_for(@donut.image))
    else
      render json: @donut.as_json.merge(image_url: nil)
    end
  end

  # POST /donuts
  def create
    @donut = Donut.new(donut_params)

    if @donut.save
      render json: @donut, status: :created, location: api_v1_donut_url(@donut)
    else
      render json: @donut.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /donuts/1
  def update
    if @donut.update(donut_params)
      render json: @donut
    else
      render json: @donut.errors, status: :unprocessable_entity
    end
  end

  # DELETE /donuts/1
  def destroy
    @donut.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_donut
      @donut = Donut.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def donut_params
      params.require(:donut).permit(:name, :description, :price, :image, :sold_out)
    end
end
