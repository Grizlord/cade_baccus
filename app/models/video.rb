class Video < ActiveRecord::Base
  attr_accessible :title, :embed_code
  validates_presence_of :title, :embed_code
end
