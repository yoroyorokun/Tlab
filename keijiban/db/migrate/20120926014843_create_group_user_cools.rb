class CreateGroupUserCools < ActiveRecord::Migration
  def change
    create_table :group_user_cools do |t|
      t.integer :group_id
      t.integer :user_id

      t.timestamps
    end
  end
end
