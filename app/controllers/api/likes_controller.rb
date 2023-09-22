class Api::LikesController < ApplicationController

  before_action :require_logged_in

  def create
    @like = current_user.likes.new(like_params)
    @like.video_id = params[:video_id]

    if @like.save
      render :show
    else
      render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def destroy
    @like = current_user.likes.find_by(id: params[:id], video_id: params[:video_id])
    if @like
      @like.destroy
      render :show
    else
      render json: { message: 'Unauthorized to unlike' }, status: :unauthorized
    end
  end




  private
  def like_params
      params.require(:like).permit(:user_like, :user_id, :video_id)
  end
end
