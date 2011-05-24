class Picture < ActiveRecord::Base
  attr_accessible :gallery_id, :name, :image
  belongs_to :gallery
  mount_uploader :image, ImageUploader
  validates_presence_of :name
end
