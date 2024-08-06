class Api::V1::MemosController < ApplicationController
  before_action :set_memo, only: [:show, :update, :destroy]

  # GET /api/v1/memos
  def index
    @memos = Memo.all
    render json: @memos
  end

  # GET /api/v1/memos/:id
  def show
    render json: @memo
  end

  # POST /api/v1/memos
  def create
    @memo = Memo.new(memo_params)
    if @memo.save
      render json: @memo, status: :created
    else
      render json: @memo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/memos/:id
  def update
    if @memo.update(memo_params)
      render json: @memo
    else
      render json: @memo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/memos/:id
  def destroy
    @memo.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_memo
    @memo = Memo.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def memo_params
    params.require(:memo).permit(:title, :content, :author)
  end
end
