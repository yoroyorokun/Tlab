class User < ActiveRecord::Base
  require 'digest'
  attr_accessor :password
  attr_accessible :address, :name, :category_ids, :password, :password_confirmation
    
  before_save :encrypt_password
  
  private
  def encrypt_password
    self.salt = make_salt if new_record?
    self.encrypted_password = encrypt(password)
  end
  def encrypt(str)
    secure_hash("#{salt}--#{str}")
  end
  def make_salt
    secure_hash("#{Time.now.utc}--#{password}")
  end
  def secure_hash(str)
    Digest::SHA2.hexdigest(str)
  end
  public
  def correct_password?(input)
    encrypted_password == encrypt(input)
  end
  def self.authenticate(address, input_password)
    user = find_by_address(address)
    return nil if user.nil?
    return user if user.correct_password?(input_password)
    return nil
  end
  def self.authenticete_with_salt(id,cookie_salt)
    user = find_by_id(id)
    (user && user.salt == cookie_salt)? user :nil
  end

  
  validates :name, :presence => true,
                   :uniqueness => true,
                   :length => {:within => 1..30}
  validates :password, :presence => true,
                       :confirmation => true,
                       :length => {:within => 6..30},
                       :on => :user
#                       :unless => ':nested'
#                   :unless => 'join_groups.blank? || cool_groups.blank?'
  validates :address, :presence => true
  
  
  has_one :icon
  has_and_belongs_to_many :categories
  has_many :posts
  
  
  has_many :post_user_cools
  has_many :post_user_boo
  has_many :cool_posts, :through => :post_user_cools, :source => :post
  has_many :boo_posts , :through => :post_user_boo,   :source => :post
  
  has_many :group_user_cools
  has_many :group_user_joins
  has_many :cool_groups, :through => :group_user_cools, :source => :group
  has_many :join_groups , :through => :group_user_joins,   :source => :group

  
  has_many :official_page_user_cools
  has_many :cool_officials, :through => :official_page_user_cools, :source => :official_page
end
