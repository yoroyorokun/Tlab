class CreateOfficialPageUserCools < ActiveRecord::Migration
  def change
    create_table :official_page_user_cools do |t|
      t.integer :official_page_id
      t.integer :user_id

      t.timestamps
    end
  end
end
