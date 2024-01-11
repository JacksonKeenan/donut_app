require "test_helper"

class ToppingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @topping = toppings(:one)
  end

  test "should get index" do
    get toppings_url, as: :json
    assert_response :success
  end

  test "should create topping" do
    assert_difference("Topping.count") do
      post toppings_url, params: { topping: { name: @topping.name, price: @topping.price, sold_out: @topping.sold_out } }, as: :json
    end

    assert_response :created
  end

  test "should show topping" do
    get topping_url(@topping), as: :json
    assert_response :success
  end

  test "should update topping" do
    patch topping_url(@topping), params: { topping: { name: @topping.name, price: @topping.price, sold_out: @topping.sold_out } }, as: :json
    assert_response :success
  end

  test "should destroy topping" do
    assert_difference("Topping.count", -1) do
      delete topping_url(@topping), as: :json
    end

    assert_response :no_content
  end
end
