class Contact < ActiveRecord::Base
  attr_accessible :name, :email, :subject, :message
  validates_presence_of :name, :email, :subject, :message
end
