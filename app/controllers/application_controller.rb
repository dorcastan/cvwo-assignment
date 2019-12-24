class ApplicationController < ActionController::Base
end

class ApiController < ActionController::API
    include JSONAPI::ActsAsResourceController
end

class HomeController < ApplicationController
    def index; end
end
