class CreateIcons < ActiveRecord::Migration
  def change
    create_table :icons do |t|
      t.string :rootpath
      t.string :path
      t.string :filename
      t.string :filetype
      t.integer :user_id

      t.timestamps
    end
  end
end
