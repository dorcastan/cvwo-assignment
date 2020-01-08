class Tag < ApplicationRecord
    has_many :todos, inverse_of: 'tag' # bi-directional association

    validates :name, presence: true
    validates :name, uniqueness: { message: "%{value} already exists" }
end
