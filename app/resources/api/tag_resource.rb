class Api::TagResource < JSONAPI::Resource
    attributes :name, :info
    has_many :todos

    filter :name
end
