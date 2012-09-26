class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :title
      t.text :abstract
      t.integer :officialpage_id

      t.timestamps
    end
  end
end
