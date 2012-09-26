class PostUserBoo < ActiveRecord::Base
  attr_accessible :post_id, :user_id
  
  belongs_to :post,:user
end
