class UsersController < ApplicationController
  def index
    @users = User.order("created_at DESC").all
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
    @categories = Category.all
  end
  
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user])
      redirect_to :action => :index, :notice => "User updated"
    else
      render :action => :edit, :alert => "mistaked update"
    end
  end
  
  def create
    @user = User.new(params[:user])
    if @user.save
      redirect_to :action => :index , :notice => "User created"
    else
      render :action => :new, :alert => "mistaked create"
    end
  end
  
  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to :action => :index, :notice => "User deleted"
  end
  
end
