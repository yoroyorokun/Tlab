class CreatePostUserBoos < ActiveRecord::Migration
  def change
    create_table :post_user_boos do |t|
      t.integer :post_id
      t.integer :user_id

      t.timestamps
    end
  end
end
