class PagesController < ApplicationController 
  def home
    @shows = Show.find(:all, :order => :show_date)
  end
  
  def about
    @pictures = Picture.find(:all)
  end
end