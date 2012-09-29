class OfficialPageUserCool < ActiveRecord::Base
  attr_accessible :official_page_id, :user_id
  
  belongs_to :user
  belongs_to :official_page
end
