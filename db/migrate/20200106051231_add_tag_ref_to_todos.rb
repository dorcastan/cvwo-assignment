class AddTagRefToTodos < ActiveRecord::Migration[6.0]
  def change
    add_reference :todos, :tag, foreign_key: true
  end
end
