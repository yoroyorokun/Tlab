class User < ActiveRecord::Base
  attr_accessible :address, :name
  has_one :icon
  has_and_belongs_to_many :categories
  has_many :posts
  
  
  has_many :post_user_cools, :post_user_boo
  has_many :cool_posts, :through => :post_user_cools, :source => :post
  has_many :boo_posts , :through => :post_user_boo,   :source => :post
  
  has_many :group_user_cools, :group_user_joins
  has_many :cool_groups, :through => :group_user_cools, :source => :group
  has_many :join_groups , :through => :group_user_joins,   :source => :group
  
  has_many :official_page_user_cools
  has_many :cool_officials, :through => :official_page_user_cools, :source => :official_page
end
