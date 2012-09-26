class Icon < ActiveRecord::Base
  attr_accessible :filename, :filetype, :path, :rootpath
  belongs_to :user
end
