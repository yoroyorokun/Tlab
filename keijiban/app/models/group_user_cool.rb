class GroupUserCool < ActiveRecord::Base
  attr_accessible :group_id, :user_id
  
  belongs_to :group,:user
end
