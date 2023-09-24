class Api::VideosController < ApplicationController
  wrap_parameters include: Video.attribute_names + [:new_video]
  wrap_parameters include: Video.attribute_names + [:photo]

  def create
    @video = Video.new(video_params)
    @video.user_id = current_user.id
    if @video.save
      render :show
    else
      render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @videos = Video.all
    # puts @videos.inspect
    # if params[:excludeUrl] == 'true'
    #   videos = videos.map do |video|
    #     video.attributes.except("videoUrl")
    #   end
    # end

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


  private
  def video_params
      params.require(:video).permit(:title, :description, :new_video, :photo)
  end

end
