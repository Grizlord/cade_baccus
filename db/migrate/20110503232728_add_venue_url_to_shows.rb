class AddVenueUrlToShows < ActiveRecord::Migration
  def self.up
    add_column :shows, :venue_url, :string
  end

  def self.down
    remove_column :shows, :venue_url
  end
end
