class CreateOfficialPages < ActiveRecord::Migration
  def change
    create_table :official_pages do |t|
      t.string :title
      t.text :abstract

      t.timestamps
    end
  end
end
