class Group < ActiveRecord::Base
  attr_accessible :abstract, :officialpage_id, :name, :cools,
                 :join_ids, :cool_ids, :joins, :cools
  
  has_many :posts
  belongs_to :official_page
  
  has_many :group_user_cools
  has_many :group_user_joins
  has_many :cools, :through => :group_user_cools, :source => :user
  has_many :joins , :through => :group_user_joins,   :source => :user
  accepts_nested_attributes_for :cools, :allow_destroy => true
  accepts_nested_attributes_for :joins, :allow_destroy => true
  
end
