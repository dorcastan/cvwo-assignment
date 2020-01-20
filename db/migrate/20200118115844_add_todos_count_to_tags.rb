class AddTodosCountToTags < ActiveRecord::Migration[6.0]
  def change
    add_column :tags, :todos_count, :integer
  end
end
