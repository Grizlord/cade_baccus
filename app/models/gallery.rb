class Gallery < ActiveRecord::Base
  attr_accessible :name
  has_many :pictures, :dependent => :destroy
  validates_presence_of :name
end
