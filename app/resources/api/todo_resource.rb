class Api::TodoResource < JSONAPI::Resource
    attributes :title, :details, :tag_id, :tag, :user_id
    has_one :tag

    # Returns the model's tag name if a tag is present.
    def tag
        @model.tag.name if @model.tag
    end

    # Sets the model's tag to an existing tag if it exists. Otherwise, creates a new tag.
    def tag=(new_tag_name)
        new_tag=Tag.find_by(name: new_tag_name)
        if new_tag
            @model.tag=new_tag
        else
            @model.create_tag(name: new_tag_name)
        end
    end

    # Filters to-dos whose titles contain the given value (case insensitive).
    filter :title, apply: -> (records, value, _options) {
        @value_string = value[0]
        records.where("title ILIKE ?", "%#{@value_string}%")
    }
    
    # Filters to-dos whose details contain the given value (case insensitive).
    filter :details, apply: -> (records, value, _options) {
        @value_string = value[0]
        records.where("details ILIKE ?", "%#{@value_string}%")
    }
    
    # Filters to-dos by their tag (tag_id).
    filter :tag

    # Filters to-dos that belong to the current (logged in) user. 
    # If the given user_id does not match the current user or if no user_id is 
    # specified, no to-dos are returned.
    filter :user_id,
        default: 0,
        verify: -> (values, context) {
            values.select { |value| value == context[:current_user_id].to_s }
        }
end
