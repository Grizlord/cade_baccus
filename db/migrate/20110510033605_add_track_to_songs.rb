class AddTrackToSongs < ActiveRecord::Migration
  def self.up
    add_column :songs, :track, :string
  end

  def self.down
    remove_column :songs, :track
  end
end
