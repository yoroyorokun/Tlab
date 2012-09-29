class GroupsController < ApplicationController
  def index
    @groups = Group.order("created_at DESC").all
  end

  def show
    @group = Group.find(params[:id])
  end

  def edit
    @group = Group.find(params[:id])
    @users = User.all
  end

  def new
    @group = Group.new
    @users = User.all
  end
  
  def update
    @group = Group.find(params[:id])
    if @group.update_attributes(params[:group])
      redirect_to :action => :index, :notice => "Group updated"
    else
      @users = User.all
      render :action => :edit, :alert => "mistaked update"
    end
  end
  
  def create
    @group = Group.new(params[:group])
    if @group.save(context: :nested)
      redirect_to :action => :index , :notice => "Group created"
    else
      @users = User.all
      render :action => :new, :alert => "mistaked create"
    end
  end
  
  def destroy
    @group = Group.find(params[:id])
    @group.destroy
    redirect_to :action => :index, :notice => "Group deleted"
  end
  
end
