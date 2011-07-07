class SongsController < ApplicationController
  before_filter :login_required, :except => [:index]
  load_and_authorize_resource
  
  def index
    @songs = Song.all
  end

  def show
  end

  def new
  end

  def create
    if @song.save
      redirect_to songs_url, :notice => "Successfully created song."
    else
      render :action => 'new'
    end
  end

  def edit
  end

  def update
    if @song.update_attributes(params[:song])
      redirect_to songs_url, :notice  => "Successfully updated song."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @song.destroy
    redirect_to songs_url, :notice => "Successfully destroyed song."
  end
end