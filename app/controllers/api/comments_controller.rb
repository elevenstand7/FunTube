class Api::CommentsController < ApplicationController
  # before_action :require_logged_in
  wrap_parameters include: Comment.attribute_names + [:videoId]
  wrap_parameters include: Comment.attribute_names + [:authorId]

  def create
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = current_user.comments.find(params[:id])

    if @comment
      @comment.destroy
      render json: { message: 'Delete Comment!'}, status: :ok
    else
      render json: { errors: ['Failed to delete comment.'] }, status: :unauthorized
    end
  end

  def index
    # case
    #   when params[:author_id]
    #     @comments = Comment.where(author_id: params[:author_id])
    #   when params[:video_id]
    #     @comments = Comment.where(video_id: params[:video_id])
    #   else
      @comments = Comment.where(video_id: params[:video_id])
    # end
    render :index
  end

  def show
    @comment = Comment.find(params[:id])
    return :show
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
