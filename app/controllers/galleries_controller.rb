class GalleriesController < ApplicationController
  before_filter :login_required, :except => [:index, :show]
  load_and_authorize_resource
  
  def index
    @galleries = Gallery.all
  end

  def show
  end

  def new
  end

  def create
    if @gallery.save
      flash[:notice] = "Successfully created gallery."
      redirect_to @gallery
    else
      render :action => 'new'
    end
  end

  def edit
  end

  def update
    if @gallery.update_attributes(params[:gallery])
      flash[:notice] = "Successfully updated gallery."
      redirect_to gallery_url
    else
      render :action => 'edit'
    end
  end

  def destroy
    @gallery.destroy
    flash[:notice] = "Successfully destroyed gallery."
    redirect_to galleries_url
  end
end