module SessionsHelper
  public
  def sign_in(user)
    cookies.permanent.signed[:remember_token] = [user.id,user.salt]
  end
  def sign_out
    cookies.delete(:remember_token)
  end
  def current_user
    User.authenticete_with_salt(*remember_token)
  end
  def signed_in?
    !current_user.nil?
  end
  
  private
  def remember_token
    cookies.signed[:remember_token] || [nil, nil]
  end
end
