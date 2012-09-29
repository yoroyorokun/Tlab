class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name
      t.text :abstract
      t.integer :official_page_id

      t.timestamps
    end
  end
end
