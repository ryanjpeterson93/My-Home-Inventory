require 'test_helper'

class Api::PhotosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_photos_index_url
    assert_response :success
  end

  test "should get create" do
    get api_photos_create_url
    assert_response :success
  end

  test "should get edit" do
    get api_photos_edit_url
    assert_response :success
  end

  test "should get destroy" do
    get api_photos_destroy_url
    assert_response :success
  end

end
