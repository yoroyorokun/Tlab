# encoding: UTF-8
class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.authenticate(params[:session][:address],params[:session][:password])
    if user.nil?
      flash.now[:error] = "ログインに失敗しました"
      render 'new'
    else
      sign_in(user)
      redirect_to user, :flash =>{:notice => "ログインしました"}
    end
  end

  def destroy
    sign_out
    redirect_to root_path
  end
end
