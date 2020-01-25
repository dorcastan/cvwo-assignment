class ApplicationController < ActionController::Base
    # Convenience methods for user authentication
    # Taken from https://medium.com/how-i-get-it/react-with-rails-user-authentication-8977e98762f2
    
    # TODO: find a way to use sessions without disabling CSRF verification
    skip_before_action :verify_authenticity_token

    helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!

    def login!
        session[:user_id] = @user.id
    end

    def logged_in?
        !!session[:user_id]
    end

    def current_user
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

    def authorized_user?
        @user == current_user
    end

    def logout!
        session.clear
    end
    
    # End of convenience methods
end

class ApiController < ActionController::API
    include JSONAPI::ActsAsResourceController

    # def create
    #     Rails.logger.debug(params)
    #     super
    # end
end

class HomeController < ApplicationController
    def index; end
end
