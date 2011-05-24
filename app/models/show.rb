class Show < ActiveRecord::Base
  attr_accessible :venue, :show_date, :show_time, :venue_url
  validates_presence_of :venue, :venue_url, :show_date, :show_time
end
