class CategoryUsers < ActiveRecord::Migration
  def up
    create_table :categories_users, :id => false do |t|
      t.references :category
      t.references :user
    end
  end

  def down
    drop_table :categories_users
  end
end
