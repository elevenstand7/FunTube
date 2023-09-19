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
    @video = Video.find_by(params[:id])
    if @video
      render :show
    else
      render json: { errors: ['Cannot find video.'] }, status: :unprocessable_entity
    end
  end

  def destroy
    @video = Video.find_by(params[:id])

    if @video && @video.user_id == current_user.id
      @video.destroy
      render json: {'Delete video!'}
    else
      render json: { errors: ['Failed to delete video.'] }, status: :unauthorized
    end

  end


  private
  def video_params
      params.require(:video).permit(:title, :description, :new_video)
  end

end
