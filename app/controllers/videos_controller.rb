class VideosController < ApplicationController
  before_filter :login_required, :except => [:index]
  load_and_authorize_resource
  
  def index
    @videos = Video.all
  end

  def show
  end

  def new
  end

  def create
    if @video.save
      redirect_to videos_url, :notice => "Successfully created video."
    else
      render :action => 'new'
    end
  end

  def edit
  end

  def update
    if @video.update_attributes(params[:video])
      redirect_to videos_url, :notice  => "Successfully updated video."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @video.destroy
    redirect_to videos_url, :notice => "Successfully destroyed video."
  end
end
