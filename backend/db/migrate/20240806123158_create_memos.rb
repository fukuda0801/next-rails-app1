class CreateMemos < ActiveRecord::Migration[7.0]
  def change
    create_table :memos do |t|
      t.string :title
      t.text :content
      t.string :author

      t.timestamps
    end
  end
end
