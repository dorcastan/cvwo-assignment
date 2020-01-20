class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username, unique: true
      t.string :password_digest

      t.timestamps
    end

    add_reference :todos, :user, foreign_key: true
  end
end
