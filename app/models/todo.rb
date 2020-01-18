class Todo < ApplicationRecord
    belongs_to :tag

    validates :title, presence: true
    validates :tag_id, presence: true
    # validates_associated :tag # Note: Possible, but will impact performance
end
