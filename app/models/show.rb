class Show < ActiveRecord::Base
  attr_accessible :venue, :venue_url, :show_date, :show_time
  validates_presence_of :venue, :venue_url, :show_date, :show_time
end
