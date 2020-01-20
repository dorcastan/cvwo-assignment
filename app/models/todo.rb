class Todo < ApplicationRecord
    # Counter cache for deletion of unused tags
    belongs_to :tag, counter_cache: true
    belongs_to :user

    validates :title, presence: true
    validates :tag_id, presence: true
end
