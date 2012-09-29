class OfficialPage < ActiveRecord::Base
  attr_accessible :abstract, :name, :group_ids, :cool_ids
  
  has_many :groups
  
  has_many :official_page_user_cools
  has_many :cools, :through => :official_page_user_cools, :source => :user
end
