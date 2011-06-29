class PagesController < ApplicationController
  def home
    @shows = Show.find(:all)
    @date = params[:month] ? Date.parse(params[:month].gsub('-', '/')) : Date.today
  end
  
  def about
    @pictures = Picture.find(:all)
  end
end