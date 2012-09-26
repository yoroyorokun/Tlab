class OfficialPageUserCool < ActiveRecord::Base
  attr_accessible :official_page_id, :user_id
  
  belongs_to :users,:official_pages
end
