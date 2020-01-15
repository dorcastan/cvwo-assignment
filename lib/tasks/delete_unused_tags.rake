task :delete_unused_tags do
    Tag.includes(:todos).each do |tag|
        if tag.todos.empty?
            tag.destroy
        end
    end
end
