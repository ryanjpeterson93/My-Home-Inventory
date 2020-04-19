class Api::ReceiptsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_item
  before_action :set_receipt, only: [:show, :edit, :destroy, :update]
  
  def index
    receipts = @item.receipts.all
    render json: receipts
  end

  def show
    render json: @items.receipts.find(params[:id])
  end

  def create
    file = params[:file]
     receipt = @item.receipts.new(receipt_params)
     if receipt.save
      ext = File.extname(file.tempfile)
      cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true)
      image = @item.receipts.create(img: cloud_image['secure_url'], name: file.original_filename) 

      render json: receipt, json: image
     else
     render json: receipt.errors, status: 422
     end
  end

  def update
    @receipt.update(receipt_params)
    render json: @receipt
  end

  def destroy
    @receipt.destroy
    render json: { message: 'Receipt deleted.' }
  end

 private

  def receipt_params
    params.require(:receipt).permit(:date, :receipt_num, :purchased_from, :price, :tax, :img, :item_id)
  end

  def set_item
    @item = Item.find(params[:item_id])
  end
  
  def set_receipt
   @receipt = @item.receipts.find(params[:id])
  end
end