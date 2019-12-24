class Api::TodoResource < JSONAPI::Resource
    attributes :title, :body
end
