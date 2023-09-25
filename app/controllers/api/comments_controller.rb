class Api::CommentsController < ApplicationController
  before_action :require_logged_in
  wrap_parameters include: Comment.attribute_names + [:videoId]

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])

    if @comment && @comment.author_id == current_user.id
      @comment.destroy
      render json: { message: 'Delete Comment!'}, status: :ok
    else
      render json: { errors: ['Failed to delete comment.'] }, status: :unauthorized
    end
  end

  def index
    case
    when params[:author_id]
      comments = Comment.where(author_id: params[:author_id])
    when params[:video_id]
      comments = Comment.where(video_id: params[:video_id])
    else
      comment = Comment.all
    end
    render :index
  end

  def update
    @comment = Comment.find(params[:id])

    if @comment.update(comment_params)
      render :show
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end


  def comment_params
    params.require(:comment).permit(:body, :author_id, :video_id)
  end
end
