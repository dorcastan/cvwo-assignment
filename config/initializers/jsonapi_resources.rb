JSONAPI.configure do |config|
    config.resource_cache = Rails.cache
    config.default_caching = true
end
