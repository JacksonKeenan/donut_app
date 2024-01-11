require "test_helper"

class Api::V1::SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get donuts" do
    get api_v1_search_donuts_url
    assert_response :success
  end
end
