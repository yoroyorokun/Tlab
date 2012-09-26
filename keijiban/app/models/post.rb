class Post < ActiveRecord::Base
  attr_accessible :score, :text, :group_id, :user_id
  
  belongs_to :user, :group
  has_many :post_user_cools, :post_user_boo
  has_many :cools, :through => :post_user_cools, :source => :user
  has_many :boos , :through => :post_user_boo,   :source => :user
  
  has_one :screenshot
  
end
