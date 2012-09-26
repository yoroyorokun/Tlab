class Screenshot < ActiveRecord::Base
  attr_accessible :filename, :filetype, :path, :rootpath, :post_id
  
  belongs_to :post
end
