class Api::VideosController < ApplicationController
  wrap_parameters include: Video.attribute_names + [:new_video]
  wrap_parameters include: Video.attribute_names + [:photo]

  def create
    @video = Video.new(video_params)
    debugger
    @video.user_id = current_user.id
    if @video.save
      render :show
    else
      render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    if params[:query]
      @videos = Video.where('LOWER(title) LIKE LOWER(?)', "%#{params[:query]}%")
    else
      @videos = Video.all
    end
    # @videos = Video.where(user_id: params[:user_id])

    render :index
  end

  def show
    @video = Video.find(params[:id])
    if @video
      render :show
    else
      render json: { errors: ['Cannot find video.'] }, status: :unprocessable_entity
    end
  end

  def destroy
    @video = Video.find(params[:id])

    if @video && @video.user_id == current_user.id
      @video.destroy
      render json: { message: 'Delete video!'}, status: :ok
    else
      render json: { errors: ['Failed to delete video.'] }, status: :unauthorized
    end

  end

  def search
    query = params[:query]
    @videos = Video.where('LOWER(title) LIKE LOWER(?)', "%#{params[:query]}%")
    render :index
  end

  private
  def video_params
      params.require(:video).permit(:title, :description, :new_video, :photo, :user_id)
  end

end
