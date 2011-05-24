class CreateShows < ActiveRecord::Migration
  def self.up
    create_table :shows do |t|
      t.string :venue
      t.date :show_date
      t.time :show_time
      t.timestamps
    end
  end

  def self.down
    drop_table :shows
  end
end
