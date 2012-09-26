class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :text
      t.string :score
      t.integer :group_id
      t.integer :user_id

      t.timestamps
    end
  end
end
