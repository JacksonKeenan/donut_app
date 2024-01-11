require "test_helper"

class DonutsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @donut = donuts(:one)
  end

  test "should get index" do
    get donuts_url, as: :json
    assert_response :success
  end

  test "should create donut" do
    assert_difference("Donut.count") do
      post donuts_url, params: { donut: { description: @donut.description, name: @donut.name, price: @donut.price } }, as: :json
    end

    assert_response :created
  end

  test "should show donut" do
    get donut_url(@donut), as: :json
    assert_response :success
  end

  test "should update donut" do
    patch donut_url(@donut), params: { donut: { description: @donut.description, name: @donut.name, price: @donut.price } }, as: :json
    assert_response :success
  end

  test "should destroy donut" do
    assert_difference("Donut.count", -1) do
      delete donut_url(@donut), as: :json
    end

    assert_response :no_content
  end

  test 'should display donuts in descending order' do
    get donuts_url, as: :json
    assert_equal Donut.order(created_at: :desc), assigns(:donuts)
  end
end
