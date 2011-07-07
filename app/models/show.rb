class Show < ActiveRecord::Base
  attr_accessible :venue, :venue_url, :show_date, :show_time, :notes
  validates_presence_of :venue, :venue_url, :show_date, :show_time, :notes
  scope :upcoming, lambda { where("show_date >= ?", Date.today).order(:show_date) }
end
