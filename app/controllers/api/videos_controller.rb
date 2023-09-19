class Api::VideosController < ApplicationController

  def create
    @video = Video.new(video_params)
    @video.user_id = current_user.id
    if @video.save
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @videos = Video.all
    render :index
  end

  def show

  end

  def destroy
    @video = Video


  end


  private
  def video_params
      params.require(:video).permit(:title, :description)
  end

end
