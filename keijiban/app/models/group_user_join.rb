class GroupUserJoin < ActiveRecord::Base
  attr_accessible :group_id, :user_id
  
  belongs_to :group
  belongs_to :user
end
