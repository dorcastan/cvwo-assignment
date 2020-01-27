class Api::TodosController < ApiController
    # Adds the currently logged in user to the given parameters.
    def create
        params[:data][:attributes]['user-id'] = context[:current_user_id]
        super
    end

    def context
        {current_user_id: session[:user_id]}
    end
end
