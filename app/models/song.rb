class Song < ActiveRecord::Base
  attr_accessible :name, :track
  mount_uploader :track, TrackUploader
end
