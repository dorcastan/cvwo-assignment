class RenameBodyToDetails < ActiveRecord::Migration[6.0]
  def change
    rename_column :todos, :body, :details
  end
end
