class PagesController < ApplicationController 
  def home
    @shows = Show.upcoming
  end
  
  def about
  end
  
  def admin
  end
end