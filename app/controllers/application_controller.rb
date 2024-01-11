class ApplicationController < ActionController::API
  private

  def augment_with_image(donut)
    if donut.image.attached?
      donut.as_json.merge(image_url: url_for(donut.image))
    else
      donut.as_json.merge(image_url: nil)
    end
  end

  def paginate_items(donuts, donuts_per_page)
    paginated_donuts = donuts.page(params[:page]).per(donuts_per_page)
    paginated_donuts.map {|donut| augment_with_image(donut)}
  end

  def paginate_orders(orders, orders_per_page)
    paginated_orders = orders.page(params[:page]).per(orders_per_page)
    paginated_orders.map {|order| order.as_json}
  end
end
