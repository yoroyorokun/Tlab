class CreateScreenshots < ActiveRecord::Migration
  def change
    create_table :screenshots do |t|
      t.string :rootpath
      t.string :path
      t.string :filename
      t.string :filetype
      t.integer :post_id

      t.timestamps
    end
  end
end
