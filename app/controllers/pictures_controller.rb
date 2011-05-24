class PicturesController < ApplicationController
  before_filter :login_required, :except => [:show]
  load_and_authorize_resource
  
  def show
  end
  
  def new
    @picture = Picture.new(:gallery_id => params[:gallery_id])
  end

  def create
    if @picture.save
      flash[:notice] = "Successfully created picture."
      redirect_to @picture.gallery
    else
      render :action => 'new'
    end
  end

  def edit
  end

  def update
    if @picture.update_attributes(params[:picture])
      flash[:notice] = "Successfully updated picture."
      redirect_to @picture.gallery
    else
      render :action => 'edit'
    end
  end

  def destroy
    @picture.destroy
    flash[:notice] = "Successfully destroyed picture."
    redirect_to @picture.gallery
  end
end
