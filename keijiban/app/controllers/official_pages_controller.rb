class OfficialPagesController < ApplicationController
  def index
    @official_pages = OfficialPage.order("created_at DESC").all
  end

  def show
    @official_page = OfficialPage.find(params[:id])
  end

  def edit
    @official_page = OfficialPage.find(params[:id])
    @users = User.all
    @groups = Group.all
  end

  def new
    @official_page = OfficialPage.new
    @users = User.all
    @groups = Group.all
  end
  
  def update
    @official_page = OfficialPage.find(params[:id])
    if @official_page.update_attributes(params[:official_page])
      redirect_to :action => :index, :notice => "OfficialPage updated"
    else
      @users = User.all
      @groups = Group.all
      render :action => :edit, :alert => "mistaked update"
    end
  end
  
  def create
    @official_page = OfficialPage.new(params[:official_page])
    if @official_page.save
      redirect_to :action => :index , :notice => "OfficialPage created"
    else
      @users = User.all
      @groups = Group.all
      render :action => :new, :alert => "mistaked create"
    end
  end
  
  def destroy
    @official_page = OfficialPage.find(params[:id])
    @official_page.destroy
    redirect_to :action => :index, :notice => "OfficialPage deleted"
  end
  
end
