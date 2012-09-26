class Group < ActiveRecord::Base
  attr_accessible :abstract, :officialpage_id, :title
  
  has_many :posts
  belongs_to :official_page
  
  has_many :group_user_cools, :group_user_joins
  has_many :cools, :through => :group_user_cools, :source => :user
  has_many :joins , :through => :group_user_joins,   :source => :user
  
end
