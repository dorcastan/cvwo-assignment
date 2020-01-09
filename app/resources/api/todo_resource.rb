class Api::TodoResource < JSONAPI::Resource
    attributes :title, :details, :tag_id, :tag
    has_one :tag

    def tag
        @model.tag.name if @model.tag
    end

    def tag=(new_tag_name)
        new_tag=Tag.find_by(name: new_tag_name)
        if new_tag
            @model.tag=new_tag
        else
            @model.create_tag(name: new_tag_name)
        end
    end

    filters :title, :details, :tag
end
