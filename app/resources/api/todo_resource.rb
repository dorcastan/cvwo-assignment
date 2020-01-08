class Api::TodoResource < JSONAPI::Resource
    attributes :title, :details, :tag_id, :tag
    has_one :tag

    def tag
        @model.tag.name if @model.tag
    end
end
