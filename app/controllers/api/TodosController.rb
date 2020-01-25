class Api::TodosController < ApiController
    # Adds the currently logged in user to the given parameters.
    def create
        params[:data][:attributes]['user-id'] = User.find(session[:user_id]).id
        super
    end
end
