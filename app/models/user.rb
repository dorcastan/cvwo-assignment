class User < ApplicationRecord
    has_secure_password
    has_many :todos

    validates :username, presence: true
    validates :username, uniqueness: { case_sensitive: false }
    validates :username, length: { minimum: 4 }

    validates :password, presence: true
    validates_confirmation_of :password
end
