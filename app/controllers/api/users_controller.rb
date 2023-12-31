class Api::UsersController < ApplicationController

  wrap_parameters include: User.attribute_names + ['password']

  before_action :require_logged_out, only: [:create]

  def create
      @user = User.new(user_params)

      if @user.save
          login!(@user)
          render :show
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def index
    @user = User.all
    render :index
  end


  private

  def user_params
      params.require(:user).permit(:username, :email, :password)
  end
end
