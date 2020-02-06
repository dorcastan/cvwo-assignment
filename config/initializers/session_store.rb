# if Rails.env === 'production'
#     Rails.application.config.session_store :cookie_store, key: '_todolist_app', domain: 'http://todolist-9920.herokuapp.com/'
# else
Rails.application.config.session_store :cookie_store, key: '_todolist_app'
# end
