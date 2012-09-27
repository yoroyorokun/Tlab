class GroupsController < ApplicationController
  def index
    @groups = Group.order("created_at DESC").all
  end

  def show
    @group = Group.find(params[:id])
  end

  def edit
    @group = Group.find(params[:id])
  end

  def new
    @group = Group.new
  end
  
  def update
    @group = Group.find(params[:id])
    if @group.update_attributes(params[:user])
      redirect_to :action => :index, :notice => "Group updated"
    else
      render :action => :edit, :alert => "mistaked update"
    end
  end
  
  def create
    @group = Group.new(params[:user])
    if @group.save
      redirect_to :action => :index , :notice => "Group created"
    else
      render :action => :new, :alert => "mistaked create"
    end
  end
  
  def destroy
    @group = Group.find(params[:id])
    @group.destroy
    redirect_to :action => :index, :notice => "Group deleted"
  end
  
end
