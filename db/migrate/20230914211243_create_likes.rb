class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.boolean :user_like, null:false, default: false
      t.references :user, null:false, foreign_key:true
      t.references :video, null:false, foreign_key:true
      t.timestamps
    end
  end
end
