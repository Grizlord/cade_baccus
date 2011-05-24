class ShowsController < ApplicationController
  before_filter :login_required, :except => [:index, :show]
  load_and_authorize_resource
  
  def index
    @shows = Show.find(:all)
    @date = params[:month] ? Date.parse(params[:month].gsub('-', '/')) : Date.today
  end

  def show
  end

  def new
  end

  def create
    if @show.save
      redirect_to @show, :notice => "Successfully created show."
    else
      render :action => 'new'
    end
  end

  def edit
  end

  def update
    if @show.update_attributes(params[:show])
      redirect_to @show, :notice  => "Successfully updated show."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @show.destroy
    redirect_to shows_url, :notice => "Successfully destroyed show."
  end
end
